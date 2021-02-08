#!/bin/bash

# Initialize
kubectl exec vault-0 -- vault operator init -key-shares=1 -key-threshold=1 -format=json > cluster-keys.json;

# Unseal
VAULT_UNSEAL_KEY=$(cat cluster-keys.json | jq -r ".unseal_keys_b64[]");
kubectl exec vault-0 -- vault operator unseal $VAULT_UNSEAL_KEY;

# Authenticate
VAULT_TOKEN=$(cat cluster-keys.json | jq -r ".root_token");
kubectl exec vault-0 -- vault login $VAULT_TOKEN;

# Enable engine
kubectl exec vault-0 -- vault secrets enable -path=secret kv-v2
