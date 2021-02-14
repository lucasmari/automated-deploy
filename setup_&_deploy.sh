#!/bin/bash
set -eu pipefail

NC='\e[0m'
GREEN='\e[0;32m'
YELLOW='\e[0;33m'
BLUE='\e[0;34m'

waiting() {
    printf "\\r${YELLOW}  Waiting for Consul server ..."
    sleep 0.2
    printf "\\r  Waiting for Consul server ·.."
    sleep 0.2
    printf "\\r  Waiting for Consul server .·."
    sleep 0.2
    printf "\\r  Waiting for Consul server ..·"
    sleep 0.2
}

echo -e "${BLUE}  [ Creating cluster ]\n${NC}- - - - - - - - - - - - -"
k3d cluster create -p "8082:80@loadbalancer" --api-port 6550;

echo -e "${BLUE}  [ Deploying infra ]\n${NC}- - - - - - - - - - - - -"
helmfile -q apply;
while [[ $(kubectl get pods --namespace default -l "app=consul,component=server" -o 'jsonpath={..status.conditions[?(@.type=="Ready")].status}') != "True" ]]; do waiting; done
echo -e "\\r${GREEN}  Ready!\n"

echo -e "${BLUE}  [ Deploying app ]\n${NC}- - - - - - - - - - - -"
skaffold dev