# API Gateway Service

The API Gateway serves as the entry point for all client requests, handling authentication with AWS Cognito and routing to the appropriate microservices.

## Features

- 🔐 AWS Cognito JWT authentication
- 🔄 Request routing to microservices
- 🏥 Health check endpoints
- 📊 Service status monitoring
- 🛡️ Centralized security

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
```bash
cp .env.example .env
# Edit .env with your AWS Cognito details and service URLs
```

3. Run the service:
```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

## API Endpoints

### Health Check
- `GET /api/v1/health` - Gateway health status
- `GET /api/v1/health/services` - All services health status

### Proxied Routes (require authentication)
- `/api/v1/user/*` - User service
- `/api/v1/admin/*` - Admin service
- `/api/v1/partner/*` - Partner service
- `/api/v1/booking/*` - Booking service
- `/api/v1/payment/*` - Payment service
- `/api/v1/notification/*` - Notification service

## Authentication

Include the AWS Cognito access token in the Authorization header:
```
Authorization: Bearer <your-cognito-access-token>
```

## Environment Variables

See `.env.example` for all required configuration.

