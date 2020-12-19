terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
    }
  }

  backend "s3" {
    bucket = "bb6104e6-1144-342e-10d6-7d1e4f983710"
    key    = "webapp/terraform.tfstate"
    region = "us-east-1"
  }
}

provider "aws" {
  region = var.region
}
