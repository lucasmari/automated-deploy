# Automated Deploy

Simple web app with an automated deploy :v:

## About

Yet another ~~complex~~ not so simple project for training DevOps and Programming skills.

### Structure and Components

#### Infrastructure

Cloud Provider

- AWS

CI/CD

- CircleCI

Provisioning

- Development

  - K3d
  - Helm
  - Helmfile
  - Skaffold

- Production
  
  - Packer
  - Terraform
  - Ansible

Service Mesh & Secrets Management

- Consul
- Vault

Database & Storage

- MongoDB
- S3

Containers & Container Orchestration

- Docker
- Kubernetes

Monitoring

- Prometheus (collector)
- Grafana (infra)
- Sentry (app)
- Elastic Stack

#### Web Application

Ingress/Load Balancer/Reverse Proxy

- Nginx

Frontend (JS, HTML, CSS)

- Apollo (GraphQL client)
- React (library)
- Node.js (server)

Backend (Ruby)

- GraphQL server
- Sinatra (framework)
- Puma (server)
- Mongoid (ORM)

### How It Works

TODO (diagram)

## Getting Started

### Development

#### Deployment

Prerequisites

- [docker 20.10.x](https://www.docker.com/get-started)
- [k3d 3.4.x](https://k3d.io/)
- [kubectl 1.20.x](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
- [helm 3.4.x](https://helm.sh/docs/intro/install/)
- [helm-diff 3.4.x](https://github.com/databus23/helm-diff)
- [helmfile 0.138.x](https://github.com/roboll/helmfile)
- [skaffold 1.19.x](https://skaffold.dev/docs/install/)

Setup & Deploy

Run the script `./setup_&_deploy.sh` in the root folder, then access the app at *localhost:8082*. :clap:

> This will create a cluster using k3d, deploy Helm charts using helmfile and deploy k8s resources using skaffold.

Subsequent Deployments

After the setup, you just need to start the cluster with `k3d cluster start`, then run `skaffold dev`.

#### Monitoring

Consul

You can access Consul UI in *localhost:18500* after running:

- `kubectl port-forward service/consul-ui 18500:80 --address 0.0.0.0`

Prometheus

You can access Prometheus UI in *localhost:9090* after running:

- `kubectl port-forward service/prometheus-server 9090:80 --address 0.0.0.0`

Grafana

You can access Grafana UI in *localhost:3000* after running:

- `kubectl port-forward service/grafana 3000:80 --address 0.0.0.0`

> Login with *admin* and *password* then import the dashboard from *infra/dev/grafana/dashboard.json*.

#### Testing

Prerequisites

- [docker-compose 1.28.x](https://docs.docker.com/compose/install/)
- [bundler 2.1.x](https://bundler.io/)
- [rspec 3.9.x](https://rspec.info/)
- [yarn 1.22.x](https://yarnpkg.com/getting-started/install)

Backend

Enter the *backend* directory and run:

- `./run_unit_tests.sh`
- `./run_integration_tests.sh`

Frontend

Enter the *frontend* directory and run:

- `yarn` (just the first time for installing node modules, or everytime you fetch the repo)
- `yarn jest`

### Production

#### Deployment

Prerequisites

- [CircleCI account](https://app.circleci.com/dashboard)
- [AWS account](https://console.aws.amazon.com)
- [terraform 0.14.x](https://www.terraform.io/downloads.html)

Setup

1. Fork this repository
2. Open CircleCI and setup the project, adding your AWS credentials as environment variables
3. Enter the *setup* directory and run `terraform init && terraform apply`
4. Open *main.tf* and add the bucket ID

Deploy

The deployment should trigger automatically after a push or merge to the master.

## Contributing

We encourage you to contribute to Automated Deploy! Please check out the
[contributing guide](https://github.com/lucasmari/automated-deploy/blob/master/CONTRIBUTING.md).

Everyone interacting in this project is expected to follow the [code of conduct](https://github.com/lucasmari/automated-deploy/blob/master/CODE_OF_CONDUCT.md).

## License

Automated Deploy is maintained under the [MIT License](https://opensource.org/licenses/MIT).
