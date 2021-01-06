# Automated Deploy

Simple web app with an automated deploy :v:

<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about">About</a>
      <ul>
        <li><a href="#structure-and-components">Structure and Components</a></li>
        <li><a href="#how-it-works">How It Works</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#development">Development</a>
        <li><a href="#production">Production</a>
      </ul>
    </li>
  </ol>
</details>

# About

Yet another ~~complex~~ not so simple project for training DevOps and Programming skills.

## Structure and Components

### Infrastructure

#### Cloud Provider

- AWS

#### CI/CD

- CircleCI

#### Provisioning

- Packer
- Terraform
- Ansible

#### Service Mesh & Secrets Management

- Consul
- Vault

#### Database & Storage

- MongoDB
- S3

#### Containers & Container Orchestration

- Docker
- Kubernetes

#### Monitoring

- Grafana
- New Relic
- Elastic Stack

### Web Application

#### Ingress/Load Balancer/Reverse Proxy

- Nginx

#### Frontend (JS, HTML, CSS)

- Apollo (GraphQL client)
- React (library)
- Node.js (server)

#### Backend (Ruby)

- GraphQL server
- Sinatra (framework)
- Puma (server)

## How It Works

TODO

# Getting Started

## Development

### Prerequisites

- [k3d 3.4.x](https://k3d.io/)
- [Docker 20.10.x](https://www.docker.com/get-started)
- [kubectl 1.20.x](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
- [helm 3.4.x](https://helm.sh/docs/intro/install/)

### Setup

Create a local cluster and add helm repositories:

1. `k3d cluster create -p "8082:80@loadbalancer"`
2. `helm repo add hashicorp https://helm.releases.hashicorp.com`

### Deployment

Inside the project's root directory, run the following commands to deploy consul and bring the development environment up:

1. `helm install -f infra/dev/consul/values.yml consul hashicorp/consul`
2. `skaffold dev`

Now you can access the app at *localhost:8082* :clap:

#### Extra

You can access Consul's dashboard in *localhost:18500* by running:

- `kubectl port-forward service/consul-ui 18500:80 --address 0.0.0.0`

## Production

### Prerequisites

- CircleCI account
- AWS account
- Terraform 0.14.x

### Setup

1. Fork this repository
2. Open CircleCI and setup the project, adding your AWS credentials as environment variables
3. Enter the *setup* directory and run `terraform init && terraform apply`
4. Open *main.tf* and add the bucket ID

### Deployment

The deployment should trigger automatically after a push or merge to the master.