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
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#setup">Setup</a></li>
      </ul>
    </li>
    <li>
      <a href="#usage">Usage</a>
      <ul>
        <li><a href="#application-development">Application Development</a>
    </li>
  </ol>
</details>

## About

Yet another ~~complex~~ simple project for training DevOps and programming skills.

## Structure and Components

### Infrastructure

#### Cloud Provider

- AWS

#### CI/CD

- Circle CI

#### Provisioning

- Packer
- Terraform
- Ansible

#### Service Mesh & Secrets Management

- Consul
- Vault

#### Database Systems

- DynamoDB
- S3

#### Containers & Container Orchestration

- Docker
- Kubernetes

#### Monitoring

- Grafana
- New Relic
- Elastic Stack

### Web Application

#### Server

- Nginx

#### Frontend

- HTML
- CSS
- JavaScript

#### Backend

- Ruby

## How It Works

TODO

## Getting Started

### Prerequisites

- CircleCI account
- AWS account
- Terraform 0.14.x

### Setup

1. Fork this repository
2. Open CircleCI and setup the project, adding your AWS credentials as environment variables
3. Enter the *setup* directory and run `terraform init && terraform apply`
4. Open *main.tf* and add the bucket ID

## Usage

The deployment should trigger automatically after pushing a commit to the master.

### Application Development

TODO