# EduMaster AWS Deployment Guide

## 🚀 Quick Deployment Steps

### Prerequisites
1. AWS account with appropriate permissions
2. GitHub repository secrets configured:
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY` 
   - `DB_PASSWORD` (for RDS database)

### Step 1: Create AWS Infrastructure
```bash
# Trigger infrastructure creation workflow
# Go to: https://github.com/kknimesh/EduMaster/actions
# Click "Create AWS Infrastructure" → "Run workflow"
```

### Step 2: Deploy Application
```bash
# Trigger deployment workflow  
# Go to: https://github.com/kknimesh/EduMaster/actions
# Click "Deploy EduMaster" → "Run workflow"
```

## 🏗️ Infrastructure Components

### Created Resources:
- **VPC**: Custom network with public/private subnets
- **ECS Cluster**: Container orchestration
- **Application Load Balancer**: Traffic distribution
- **RDS PostgreSQL**: Database
- **ECR Repository**: Container registry
- **Security Groups**: Network security

### Estimated Costs:
- **ECS Tasks**: ~$30-50/month
- **RDS db.t3.micro**: ~$15/month  
- **ALB**: ~$20/month
- **Data Transfer**: Variable
- **Total**: ~$65-85/month

## 🔧 Manual Deployment (Alternative)

If GitHub Actions fails, you can deploy manually:

### 1. Install Tools
```bash
# AWS CLI
curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg"
sudo installer -pkg AWSCLIV2.pkg -target /

# Terraform
brew install terraform

# Configure AWS
aws configure
```

### 2. Create Infrastructure
```bash
cd infrastructure/terraform
terraform init
terraform plan
terraform apply
```

### 3. Build and Deploy
```bash
# Create ECR repo
aws ecr create-repository --repository-name edumaster

# Get login token
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account>.dkr.ecr.us-east-1.amazonaws.com

# Build and push
docker build -t edumaster:latest ./frontend
docker tag edumaster:latest <account>.dkr.ecr.us-east-1.amazonaws.com/edumaster:frontend-latest
docker push <account>.dkr.ecr.us-east-1.amazonaws.com/edumaster:frontend-latest
```

## 📊 Monitoring & Access

### Application URLs:
- **Load Balancer**: `http://[ALB-DNS-NAME]`
- **Custom Domain**: Configure Route 53 after deployment

### Monitoring:
- **CloudWatch Logs**: Container logs
- **ECS Console**: Service health
- **RDS Console**: Database metrics

## 🔒 Security Features

- **VPC**: Isolated network
- **Security Groups**: Restrict access
- **HTTPS**: SSL/TLS encryption (configure after deployment)
- **IAM Roles**: Least privilege access
- **Container Security**: Trivy vulnerability scanning

## 🐛 Troubleshooting

### Common Issues:
1. **GitHub Secrets**: Ensure AWS credentials are set
2. **Permissions**: Verify IAM user has required permissions
3. **Region**: Confirm all resources in same region (us-east-1)
4. **Database Password**: Must meet AWS complexity requirements

### Support:
- Check GitHub Actions logs for detailed errors
- Review CloudWatch logs for runtime issues
- Verify security group configurations for connectivity