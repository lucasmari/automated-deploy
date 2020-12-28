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

#### Reverse Proxy

- Nginx

#### Frontend (JS, HTML, CSS)

- Node.js (server)
- React (library)

#### Backend (Ruby)

- Puma (server)
- Sinatra (framework)

## How It Works

TODO

# Getting Started

## Development

### Prerequisites

- Docker 20.10.x

### Deployment

1. Run `docker-compose up -d` in the project's root directory
2. Access the app at *localhost*

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