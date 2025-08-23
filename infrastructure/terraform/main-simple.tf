# Configure AWS Provider
terraform {
  required_version = ">= 1.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# Random suffix to avoid naming conflicts
resource "random_id" "suffix" {
  byte_length = 4
}

# Use Default VPC instead of creating new one
data "aws_vpc" "default" {
  default = true
}

# Get default subnets
data "aws_subnets" "default" {
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.default.id]
  }
}

# Get individual subnet details
data "aws_subnet" "default_subnets" {
  count = length(data.aws_subnets.default.ids)
  id    = data.aws_subnets.default.ids[count.index]
}

# ECS Cluster
resource "aws_ecs_cluster" "edumaster_cluster" {
  name = "edumaster-cluster-${random_id.suffix.hex}"

  setting {
    name  = "containerInsights"
    value = "enabled"
  }

  tags = {
    Name = "EduMaster ECS Cluster"
  }
}

# Security Group for ALB
resource "aws_security_group" "alb_sg" {
  name        = "edumaster-alb-sg-${random_id.suffix.hex}"
  description = "Security group for EduMaster ALB"
  vpc_id      = data.aws_vpc.default.id

  ingress {
    description = "HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "HTTPS"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "EduMaster ALB Security Group"
  }
}

# Application Load Balancer (using default subnets)
resource "aws_lb" "edumaster_alb" {
  name               = "edumaster-alb-${random_id.suffix.hex}"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb_sg.id]
  subnets            = data.aws_subnets.default.ids

  enable_deletion_protection = false

  tags = {
    Name = "EduMaster ALB"
  }
}

# Security Group for RDS
resource "aws_security_group" "rds_sg" {
  name        = "edumaster-rds-sg-${random_id.suffix.hex}"
  description = "Security group for EduMaster RDS"
  vpc_id      = data.aws_vpc.default.id

  ingress {
    description = "PostgreSQL"
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = [data.aws_vpc.default.cidr_block]
  }

  tags = {
    Name = "EduMaster RDS Security Group"
  }
}

# RDS Subnet Group (using default subnets)
resource "aws_db_subnet_group" "edumaster_db_subnet_group" {
  name       = "edumaster-db-subnet-group-${random_id.suffix.hex}"
  subnet_ids = data.aws_subnets.default.ids

  tags = {
    Name = "EduMaster DB Subnet Group"
  }
}

# RDS Instance (PostgreSQL)
resource "aws_db_instance" "edumaster_db" {
  identifier                = "edumaster-db-${random_id.suffix.hex}"
  engine                   = "postgres"
  engine_version           = "15"
  instance_class           = "db.t3.micro"
  allocated_storage        = 20
  storage_type             = "gp2"
  storage_encrypted        = true
  
  db_name  = "edumaster"
  username = var.db_username
  password = var.db_password
  
  vpc_security_group_ids = [aws_security_group.rds_sg.id]
  db_subnet_group_name   = aws_db_subnet_group.edumaster_db_subnet_group.name
  
  backup_retention_period = 7
  backup_window          = "03:00-04:00"
  maintenance_window     = "sun:04:00-sun:05:00"
  
  skip_final_snapshot = true
  deletion_protection = false
  publicly_accessible = false

  tags = {
    Name = "EduMaster RDS"
  }
}

# Outputs
output "vpc_id" {
  description = "VPC ID (using default)"
  value       = data.aws_vpc.default.id
}

output "db_host" {
  description = "Database hostname"
  value       = aws_db_instance.edumaster_db.address
  sensitive   = false
}

output "alb_dns_name" {
  description = "Load balancer DNS name"
  value       = aws_lb.edumaster_alb.dns_name
}

output "alb_zone_id" {
  description = "Load balancer zone ID"
  value       = aws_lb.edumaster_alb.zone_id
}