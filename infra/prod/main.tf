terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
    }
    helm = {
      source  = "hashicorp/helm"
      version = ">= 2.0"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 1.11"
    }
  }

  backend "s3" {
    bucket = "bb6104e6-1144-342e-10d6-7d1e4f983710"
    key    = "app/terraform.tfstate"
    region = "us-east-1"
  }
}

provider "aws" {
  region = var.region
}

provider "helm" {
  kubernetes {
    config_path = "~/.kube/config"
  }
}

resource "helm_release" "consul" {
  name       = "consul"
  repository = "https://helm.releases.hashicorp.com"
  chart      = "consul"

  values = [
    file("consul_values/values.yml")
  ]
}

module "ingress" {
  source = "./k8s_ingress"
}

module "services" {
  source = "./k8s_services"
}

module "deployments" {
  depends_on = [helm_release.consul]
  source     = "./k8s_deployments"
}
