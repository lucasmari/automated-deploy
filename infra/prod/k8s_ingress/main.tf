resource "kubernetes_service" "ingress" {
  metadata {
    name = "ingress-service"
  }
  spec {
    port {
      port        = 80
      target_port = 80
      protocol    = "TCP"
    }
    type = "NodePort"
  }
}

resource "kubernetes_ingress" "ingress" {
  metadata {
    name = "ingress"
    annotations = {
      "kubernetes.io/ingress.class"           = "alb"
      "alb.ingress.kubernetes.io/scheme"      = "internet-facing"
      "alb.ingress.kubernetes.io/target-type" = "ip"
    }
  }
  spec {
    rule {
      http {
        path {
          backend {
            service_name = "lb-front"
            service_port = 80
          }

          path = "/"
        }

        path {
          backend {
            service_name = "lb-back"
            service_port = 8080
          }

          path = "/graphql"
        }
      }
    }
  }
}
