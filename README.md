# EduMaster - Complete Education Management System

A comprehensive, microservices-based education management system built with modern technologies including React, React Native, Node.js, and cloud infrastructure.

## 🏗️ Architecture

EduMaster follows a microservices architecture with the following components:

### Frontend
- **Technology**: React with TypeScript
- **UI Framework**: Tailwind CSS + Headless UI
- **State Management**: Context API / Redux Toolkit
- **Testing**: Jest + React Testing Library

### Mobile Application
- **Technology**: React Native with Expo
- **Navigation**: React Navigation
- **State Management**: Context API / Redux Toolkit
- **Testing**: Jest + Detox

### Backend Services
1. **Gateway Service** - API Gateway and routing
2. **Auth Service** - Authentication and authorization
3. **User Service** - User management
4. **Course Service** - Course and curriculum management
5. **Notification Service** - Email, SMS, and push notifications
6. **Analytics Service** - Data analytics and reporting
7. **Payment Service** - Payment processing
8. **Content Service** - File and media management
9. **Assignment Service** - Assignment and homework management
10. **Grade Service** - Grading and assessment

### Infrastructure
- **Containerization**: Docker & Docker Compose
- **Orchestration**: Kubernetes
- **Cloud**: AWS (Terraform managed)
- **Databases**: MongoDB, PostgreSQL, Redis
- **CI/CD**: GitHub Actions

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm 8+
- Docker & Docker Compose
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/kknimesh/EduMaster.git
cd EduMaster
```

2. Make the setup script executable and run it:
```bash
chmod +x complete-setup
./complete-setup
```

3. Start the development environment:
```bash
# Using Docker Compose
docker-compose up -d

# Or run individual services
npm run dev
```

### Development Commands

```bash
# Install all dependencies
npm run install:all

# Start all services
npm run dev

# Run tests
npm test

# Build all applications
npm run build

# Lint code
npm run lint
```

## 📁 Project Structure

```
EduMaster/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── utils/          # Utility functions
│   │   └── api/            # API client
├── mobile/                  # React Native mobile app
│   ├── src/
│   │   ├── components/      # Mobile components
│   │   ├── screens/        # Screen components
│   │   └── services/       # API services
├── backend/                 # Backend services
│   └── services/
│       ├── gateway-service/ # API Gateway
│       ├── auth-service/   # Authentication
│       ├── user-service/   # User management
│       └── ...             # Other microservices
├── infrastructure/          # Infrastructure as Code
│   ├── terraform/          # AWS infrastructure
│   ├── kubernetes/         # K8s manifests
│   └── docker/            # Docker configurations
└── docs/                   # Documentation
```

## 🔧 Configuration

### Environment Variables

Create `.env` files in each service directory:

#### Gateway Service
```env
NODE_ENV=development
PORT=8000
AUTH_SERVICE_URL=http://localhost:3001
USER_SERVICE_URL=http://localhost:3002
```

#### Auth Service
```env
NODE_ENV=development
PORT=3001
MONGODB_URI=mongodb://localhost:27017/edumaster_auth
JWT_SECRET=your-jwt-secret-key
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run specific service tests
npm run test:frontend
npm run test:mobile
npm run test:backend
```

## 🚀 Deployment

### Using Docker Compose
```bash
docker-compose up -d
```

### Using Kubernetes
```bash
kubectl apply -f infrastructure/kubernetes/
```

### Using Terraform (AWS)
```bash
cd infrastructure/terraform
terraform init
terraform plan
terraform apply
```

## 📊 Monitoring & Analytics

- **Application Monitoring**: Built-in analytics service
- **Infrastructure Monitoring**: CloudWatch (AWS)
- **Logging**: Centralized logging with ELK stack
- **Performance**: Application Performance Monitoring (APM)

## 🔐 Security

- JWT-based authentication
- Role-based access control (RBAC)
- API rate limiting
- Input validation and sanitization
- HTTPS enforcement
- Security headers (Helmet.js)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Nimesh Kumar** - Full Stack Developer & DevOps Engineer

## 📞 Support

For support, email nimesh.kumar@outlook.com or create an issue in the repository.

## 🗺️ Roadmap

- [ ] Advanced analytics dashboard
- [ ] Mobile app offline support
- [ ] AI-powered recommendations
- [ ] Integration with popular LMS platforms
- [ ] Multi-language support
- [ ] Advanced reporting features