terraform {
  required_providers {
    digitalocean = {
      source = "digitalocean/digitalocean"
      version = "1.22.2"
    }
  }
}

provider "digitalocean" {
  token = var.do_token
}

resource "digitalocean_droplet" "nestjs-sample" {
  image = "ubuntu-18-04-x64"
  name = "web-1"
  region = "nyc1"
  size = "s-1vcpu-1gb"
  ssh_keys = [
    var.ssh_key
  ]
}

resource "digitalocean_firewall" "web" {
  name = "only-22-80-and-443"

  droplet_ids = [
    digitalocean_droplet.nestjs-sample.id
  ]

  inbound_rule {
    protocol = "tcp"
    port_range = "22"
    source_addresses = [
      "0.0.0.0/0",
      "::/0"
    ]
  }

  inbound_rule {
    protocol = "tcp"
    port_range = "80"
    source_addresses = [
      "0.0.0.0/0",
      "::/0"
    ]
  }

  inbound_rule {
    protocol = "tcp"
    port_range = "443"
    source_addresses = [
      "0.0.0.0/0",
      "::/0"
    ]
  }

  inbound_rule {
    protocol = "icmp"
    source_addresses = [
      "0.0.0.0/0",
      "::/0"
    ]
  }

  outbound_rule {
    protocol = "icmp"
    destination_addresses = [
      "0.0.0.0/0",
      "::/0"
    ]
  }
}

###################################################
#### OUTPUT
###################################################

output "web" {
  value = digitalocean_droplet.nestjs-sample.ipv4_address
}