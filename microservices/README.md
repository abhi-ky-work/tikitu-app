# Tikitu Microservices Architecture

This directory contains all microservices for the Tikitu ticket booking application. The architecture follows a microservice pattern with an API Gateway for authentication and routing.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend                             │
│                   (Next.js + AWS Cognito)                    │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ JWT Token
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                     API Gateway (Port 3000)                  │
│          • AWS Cognito Authentication                        │
│          • Request Routing                                   │
│          • Load Balancing                                    │
└─────┬────────┬────────┬────────┬────────┬────────┬──────────┘
      │        │        │        │        │        │
      ▼        ▼        ▼        ▼        ▼        ▼
┌─────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────────┐
│  User   │ │ Admin  │ │Partner │ │Booking │ │Payment │ │Notification│
│ Service │ │Service │ │Service │ │Service │ │Service │ │  Service   │
│ :3001   │ │ :3002  │ │ :3003  │ │ :3004  │ │ :3005  │ │   :3006    │
└─────────┘ └────────┘ └────────┘ └────────┘ └────────┘ └────────────┘
```

## Services

### 1. API Gateway (Port 3000)
**Entry point for all client requests**
- AWS Cognito JWT validation
- Request routing to microservices
- Centralized authentication
- Health monitoring

**Endpoints:**
- `GET /api/v1/health` - Gateway health
- `GET /api/v1/health/services` - All services health
- `ALL /api/v1/{service}/*` - Route to respective microservice

---

### 2. User Service (Port 3001)
**User profile and account management**
- User CRUD operations
- Profile management
- User preferences

**Endpoints:**
- `GET /api/v1/user/health`

---

### 3. Admin Service (Port 3002)
**Administrative operations**
- Admin dashboard data
- System analytics
- User management
- Event/venue management

**Endpoints:**
- `GET /api/v1/admin/health`

---

### 4. Partner Service (Port 3003)
**Partner/Vendor management**
- Partner registration
- Venue management
- Event creation
- Revenue tracking

**Endpoints:**
- `GET /api/v1/partner/health`

---

### 5. Booking Service (Port 3004)
**Ticket booking operations**
- Booking creation
- Seat reservation
- Booking history
- Cancellations

**Endpoints:**
- `GET /api/v1/booking/health`

---

### 6. Payment Service (Port 3005)
**Payment processing**
- Payment gateway integration
- Transaction management
- Refunds
- Invoice generation

**Endpoints:**
- `GET /api/v1/payment/health`

---

### 7. Notification Service (Port 3006)
**Multi-channel notifications**
- Email notifications
- SMS notifications
- Push notifications
- Notification templates

**Endpoints:**
- `GET /api/v1/notification/health`

---

## Getting Started

### Prerequisites
- Node.js 20+
- Docker & Docker Compose
- PostgreSQL databases (or use Docker for DBs)
- AWS Cognito User Pool
- Environment variables configured

### Quick Start with Docker Compose

1. **Configure environment variables:**
```bash
cp .env.example .env
# Edit .env with your actual values
```

2. **Start all services:**
```bash
docker-compose up -d
```

3. **Check services health:**
```bash
curl http://localhost:3000/api/v1/health/services
```

4. **Stop all services:**
```bash
docker-compose down
```

### Development Mode (Individual Services)

To run services individually in development mode:

```bash
# Navigate to any service directory
cd user-service

# Install dependencies
npm install

# Run in dev mode
npm run start:dev
```

## API Versioning

All APIs follow the versioning pattern: `/api/v1/{service-name}/{endpoint}`

Examples:
- `GET /api/v1/user/profile`
- `POST /api/v1/booking/create`
- `GET /api/v1/payment/transactions`

## Authentication Flow

1. **Frontend** authenticates user with AWS Cognito
2. **Frontend** receives JWT access token
3. **Frontend** sends requests to API Gateway with token in header:
   ```
   Authorization: Bearer <cognito-jwt-token>
   ```
4. **API Gateway** validates token with AWS Cognito
5. **API Gateway** routes to appropriate microservice
6. **Microservice** processes request and returns response

## Service Communication

Services communicate with each other via HTTP REST APIs. The API Gateway handles external client requests, while internal service-to-service communication happens directly.

Example: Booking Service → Payment Service → Notification Service

## Health Checks

Each service exposes a health check endpoint:
- Individual: `GET /api/v1/{service}/health`
- All services: `GET /api/v1/health/services` (via API Gateway)

Response format:
```json
{
  "status": "ok",
  "service": "user-service",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 12345.67,
  "version": "1.0.0"
}
```

## Environment Variables

Each service has its own `.env.example` file. See individual service READMEs for specific configuration.

Global environment variables are managed in the root `.env` file for Docker Compose.

## Project Structure

```
microservices/
├── api-gateway/           # API Gateway & Auth
├── user-service/          # User management
├── admin-service/         # Admin operations
├── partner-service/       # Partner/Vendor management
├── booking-service/       # Booking management
├── payment-service/       # Payment processing
├── notification-service/  # Notifications
├── docker-compose.yml     # Docker orchestration
├── .env.example           # Environment template
└── README.md             # This file
```

## Tech Stack

- **Runtime:** Node.js 20
- **Framework:** NestJS
- **Language:** TypeScript
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** AWS Cognito
- **Containerization:** Docker
- **API Pattern:** REST with versioning
- **Architecture:** Microservices with API Gateway

## Development Guidelines

1. **Always use API versioning** - `/api/v1/...`
2. **Add health checks** to every service
3. **Use environment variables** for configuration
4. **Follow NestJS conventions** for code structure
5. **Document new endpoints** in service READMEs
6. **Test authentication** with valid Cognito tokens
7. **Handle errors gracefully** with proper HTTP status codes

## Deployment

### Docker Deployment
```bash
docker-compose up -d --build
```

### AWS Deployment (Example)
- Deploy each service to AWS ECS/Fargate
- Use AWS ALB for API Gateway load balancing
- Configure AWS Cognito for authentication
- Use AWS RDS for PostgreSQL databases
- Set up CloudWatch for logging and monitoring

## Monitoring & Logging

- Health checks available on all services
- Use CloudWatch or similar for centralized logging
- Monitor service-to-service communication
- Track API Gateway metrics

## Future Enhancements

- [ ] Implement message queues (RabbitMQ/SQS) for async communication
- [ ] Add Redis for caching
- [ ] Implement Circuit Breaker pattern
- [ ] Add API rate limiting
- [ ] Implement distributed tracing (Jaeger/X-Ray)
- [ ] Add comprehensive API documentation (Swagger)
- [ ] Implement event-driven architecture
- [ ] Add unit and integration tests

## Support

For questions or issues:
1. Check individual service READMEs
2. Review health check endpoints
3. Check Docker logs: `docker-compose logs [service-name]`

## License

UNLICENSED - Private Project

