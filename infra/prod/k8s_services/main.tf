resource "kubernetes_service" "lb-front" {
  metadata {
    name = "lb-front"
  }
  spec {
    selector = {
      app = "lb-front"
    }
    port {
      port = 80
    }

    type = "LoadBalancer"
  }
}

resource "kubernetes_service" "lb-back" {
  metadata {
    name = "lb-back"
  }
  spec {
    selector = {
      app = "lb-back"
    }
    port {
      port = 8080
    }

    type = "LoadBalancer"
  }
}

resource "kubernetes_service" "app-front" {
  metadata {
    name = "app-front"
  }
  spec {
    selector = {
      app = "app-front"
    }
    port {
      port = 3000
    }
  }
}

resource "kubernetes_service" "app-back" {
  metadata {
    name = "app-back"
  }
  spec {
    selector = {
      app = "app-back"
    }
    port {
      port = 4000
    }
  }
}

resource "kubernetes_service" "db" {
  metadata {
    name = "db"
  }
  spec {
    selector = {
      app = "db"
    }
    port {
      port = 27017
    }
  }
}
