# Configure AWS Provider
terraform {
  required_version = ">= 1.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# VPC
resource "aws_vpc" "edumaster_vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name = "EduMaster VPC"
  }
}

# Internet Gateway
resource "aws_internet_gateway" "edumaster_igw" {
  vpc_id = aws_vpc.edumaster_vpc.id

  tags = {
    Name = "EduMaster IGW"
  }
}

# Public Subnets
resource "aws_subnet" "public_subnet_1" {
  vpc_id                  = aws_vpc.edumaster_vpc.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "${var.aws_region}a"
  map_public_ip_on_launch = true

  tags = {
    Name = "EduMaster Public Subnet 1"
  }
}

resource "aws_subnet" "public_subnet_2" {
  vpc_id                  = aws_vpc.edumaster_vpc.id
  cidr_block              = "10.0.2.0/24"
  availability_zone       = "${var.aws_region}b"
  map_public_ip_on_launch = true

  tags = {
    Name = "EduMaster Public Subnet 2"
  }
}

# Private Subnets
resource "aws_subnet" "private_subnet_1" {
  vpc_id            = aws_vpc.edumaster_vpc.id
  cidr_block        = "10.0.3.0/24"
  availability_zone = "${var.aws_region}a"

  tags = {
    Name = "EduMaster Private Subnet 1"
  }
}

resource "aws_subnet" "private_subnet_2" {
  vpc_id            = aws_vpc.edumaster_vpc.id
  cidr_block        = "10.0.4.0/24"
  availability_zone = "${var.aws_region}b"

  tags = {
    Name = "EduMaster Private Subnet 2"
  }
}

# Route Table for Public Subnets
resource "aws_route_table" "public_rt" {
  vpc_id = aws_vpc.edumaster_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.edumaster_igw.id
  }

  tags = {
    Name = "EduMaster Public Route Table"
  }
}

# Associate Public Subnets with Route Table
resource "aws_route_table_association" "public_subnet_1_association" {
  subnet_id      = aws_subnet.public_subnet_1.id
  route_table_id = aws_route_table.public_rt.id
}

resource "aws_route_table_association" "public_subnet_2_association" {
  subnet_id      = aws_subnet.public_subnet_2.id
  route_table_id = aws_route_table.public_rt.id
}

# ECS Cluster
resource "aws_ecs_cluster" "edumaster_cluster" {
  name = "edumaster-cluster"

  setting {
    name  = "containerInsights"
    value = "enabled"
  }

  tags = {
    Name = "EduMaster ECS Cluster"
  }
}

# Application Load Balancer
resource "aws_lb" "edumaster_alb" {
  name               = "edumaster-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb_sg.id]
  subnets            = [aws_subnet.public_subnet_1.id, aws_subnet.public_subnet_2.id]

  enable_deletion_protection = false

  tags = {
    Name = "EduMaster ALB"
  }
}

# Security Group for ALB
resource "aws_security_group" "alb_sg" {
  name        = "edumaster-alb-sg"
  description = "Security group for EduMaster ALB"
  vpc_id      = aws_vpc.edumaster_vpc.id

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

# RDS Subnet Group
resource "aws_db_subnet_group" "edumaster_db_subnet_group" {
  name       = "edumaster-db-subnet-group"
  subnet_ids = [aws_subnet.private_subnet_1.id, aws_subnet.private_subnet_2.id]

  tags = {
    Name = "EduMaster DB Subnet Group"
  }
}

# RDS Instance (PostgreSQL)
resource "aws_db_instance" "edumaster_db" {
  identifier                = "edumaster-db"
  engine                   = "postgres"
  engine_version           = "14.9"
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

  tags = {
    Name = "EduMaster RDS"
  }
}

# Security Group for RDS
resource "aws_security_group" "rds_sg" {
  name        = "edumaster-rds-sg"
  description = "Security group for EduMaster RDS"
  vpc_id      = aws_vpc.edumaster_vpc.id

  ingress {
    description = "PostgreSQL"
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = [aws_vpc.edumaster_vpc.cidr_block]
  }

  tags = {
    Name = "EduMaster RDS Security Group"
  }
}