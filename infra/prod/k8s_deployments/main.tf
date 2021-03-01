resource "kubernetes_deployment" "lb-front" {
  metadata {
    name = "lb-front-deployment"
    labels = {
      app = "lb-front"
    }
  }

  spec {
    replicas = 1

    selector {
      match_labels = {
        app = "lb-front"
      }
    }

    template {
      metadata {
        labels = {
          app = "lb-front"
        }

        annotations = {
          "consul.hashicorp.com/connect-inject"            = "true"
          "consul.hashicorp.com/connect-service-upstreams" = "app-front:3000"
        }
      }

      spec {
        container {
          image = "lmari/automated-deploy:nginx-front"
          name  = "lb-front"
          port {
            container_port = 80
          }
        }
      }
    }
  }
}

resource "kubernetes_deployment" "lb-back" {
  metadata {
    name = "lb-back-deployment"
    labels = {
      app = "lb-back"
    }
  }

  spec {
    replicas = 1

    selector {
      match_labels = {
        app = "lb-back"
      }
    }

    template {
      metadata {
        labels = {
          app = "lb-back"
        }

        annotations = {
          "consul.hashicorp.com/connect-inject"            = "true"
          "consul.hashicorp.com/connect-service-upstreams" = "app-back:4000"
        }
      }

      spec {
        container {
          image = "lmari/automated-deploy:nginx-back"
          name  = "lb-back"
          port {
            container_port = 8080
          }
        }
      }
    }
  }
}

resource "kubernetes_deployment" "app-front" {
  metadata {
    name = "app-front-deployment"
    labels = {
      app = "app-front"
    }
  }

  spec {
    replicas = 1

    selector {
      match_labels = {
        app = "app-front"
      }
    }

    template {
      metadata {
        labels = {
          app = "app-front"
        }

        annotations = {
          "consul.hashicorp.com/connect-inject" = "true"
        }
      }

      spec {
        container {
          image = "lmari/automated-deploy:apollo-react-node"
          name  = "app-front"
          port {
            container_port = 3000
          }
        }
      }
    }
  }
}

resource "kubernetes_deployment" "app-back" {
  metadata {
    name = "app-back-deployment"
    labels = {
      app = "app-back"
    }
  }

  spec {
    replicas = 1

    selector {
      match_labels = {
        app = "app-back"
      }
    }

    template {
      metadata {
        labels = {
          app = "app-back"
        }

        annotations = {
          "consul.hashicorp.com/connect-inject"            = "true"
          "consul.hashicorp.com/connect-service-upstreams" = "db:27017"
        }
      }

      spec {
        container {
          image = "lmari/automated-deploy:graphql-sinatra-puma"
          name  = "app-back"
          port {
            container_port = 4000
          }
        }
      }
    }
  }
}

resource "kubernetes_deployment" "db" {
  metadata {
    name = "db-deployment"
    labels = {
      app = "db"
    }
  }

  spec {
    replicas = 1

    selector {
      match_labels = {
        app = "db"
      }
    }

    template {
      metadata {
        labels = {
          app = "db"
        }

        annotations = {
          "consul.hashicorp.com/connect-inject" = "true"
        }
      }

      spec {
        container {
          image = "lmari/automated-deploy:mongodb"
          name  = "db"
          port {
            container_port = 27017
          }
        }
      }
    }
  }
}
