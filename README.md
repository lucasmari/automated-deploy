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
        <li><a href="#requirements">Requirements</a></li>
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

- Jenkins
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

#### Containers & Container Management

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

### Requirements

- Terraform 0.14.x

### Setup

1. Fork this repository
2. Change the Jenkinsfile
3. Enter the *setup* directory
4. Run `terraform init && terraform apply`

## Usage

The deployment should trigger automatically after a commit to the master.

### Application Development

TODO