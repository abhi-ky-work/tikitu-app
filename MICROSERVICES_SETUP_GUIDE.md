# Tikitu Microservices - Complete Setup Guide

## 📋 Table of Contents
1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [AWS Cognito Setup](#aws-cognito-setup)
4. [Environment Configuration](#environment-configuration)
5. [Running Services](#running-services)
6. [Testing the Setup](#testing-the-setup)
7. [API Documentation](#api-documentation)
8. [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

Your Tikitu application has been converted from a monolith to a **microservices architecture** with the following services:

| Service | Port | Purpose |
|---------|------|---------|
| API Gateway | 3000 | Authentication & Routing |
| User Service | 3001 | User Management |
| Admin Service | 3002 | Admin Operations |
| Partner Service | 3003 | Partner/Vendor Management |
| Booking Service | 3004 | Ticket Bookings |
| Payment Service | 3005 | Payment Processing |
| Notification Service | 3006 | Email/SMS/Push Notifications |

---

## ✅ Prerequisites

Before starting, ensure you have:

- ✅ Node.js 20+ installed
- ✅ Docker & Docker Compose installed
- ✅ PostgreSQL databases (or use Docker)
- ✅ AWS Account (for Cognito)
- ✅ Git

---

## 🔐 AWS Cognito Setup

### Step 1: Create User Pool

1. Go to AWS Console → Amazon Cognito
2. Click "Create user pool"
3. Configure sign-in experience:
   - Select "Email" as sign-in option
   - Click "Next"

4. Configure security requirements:
   - Password policy: Default or customize
   - MFA: Optional (configure as needed)
   - Click "Next"

5. Configure sign-up experience:
   - Keep defaults or customize
   - Click "Next"

6. Configure message delivery:
   - Choose "Send email with Cognito"
   - Click "Next"

7. Integrate your app:
   - User pool name: `tikitu-users`
   - App client name: `tikitu-app`
   - Client secret: "Don't generate"
   - Click "Next"

8. Review and create
   - Click "Create user pool"

### Step 2: Get Credentials

After creating the user pool, note down:
- **User Pool ID**: Found in "User pool overview" (format: `us-east-1_XXXXXXXXX`)
- **Client ID**: Found in "App integration" → "App clients"
- **Region**: Your selected AWS region (e.g., `us-east-1`)

---

## ⚙️ Environment Configuration

### 1. Configure Root Environment

```bash
cd microservices
cp .env.example .env
```

Edit `.env` with your actual values:

```env
# AWS Cognito
AWS_REGION=us-east-1
COGNITO_USER_POOL_ID=us-east-1_XXXXXXXXX
COGNITO_CLIENT_ID=your-client-id-here

# Databases (update with your DB credentials)
USER_DATABASE_URL=postgresql://user:password@localhost:5432/tikitu_users
ADMIN_DATABASE_URL=postgresql://user:password@localhost:5432/tikitu_admin
PARTNER_DATABASE_URL=postgresql://user:password@localhost:5432/tikitu_partners
BOOKING_DATABASE_URL=postgresql://user:password@localhost:5432/tikitu_bookings
PAYMENT_DATABASE_URL=postgresql://user:password@localhost:5432/tikitu_payments
NOTIFICATION_DATABASE_URL=postgresql://user:password@localhost:5432/tikitu_notifications

# Stripe (for payment processing)
STRIPE_SECRET_KEY=sk_test_your_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# AWS SES (for emails)
AWS_SES_REGION=us-east-1
AWS_SES_ACCESS_KEY=your-ses-access-key
AWS_SES_SECRET_KEY=your-ses-secret-key

# Twilio (for SMS)
TWILIO_ACCOUNT_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-token
TWILIO_PHONE_NUMBER=+1234567890
```

### 2. Copy .env to API Gateway (for standalone development)

```bash
cd api-gateway
cp ../.env .env
```

---

## 🚀 Running Services

### Option 1: Docker Compose (Recommended for Production)

```bash
cd microservices

# Start all services
npm run docker:up

# Or build and start
npm run docker:build

# View logs
npm run docker:logs

# Stop all services
npm run docker:down
```

### Option 2: Development Mode (Individual Services)

**Install dependencies for all services:**
```bash
cd microservices
npm run install:all
```

**Run services individually in separate terminals:**

```bash
# Terminal 1 - API Gateway
npm run dev:gateway

# Terminal 2 - User Service
npm run dev:user

# Terminal 3 - Admin Service
npm run dev:admin

# Terminal 4 - Partner Service
npm run dev:partner

# Terminal 5 - Booking Service
npm run dev:booking

# Terminal 6 - Payment Service
npm run dev:payment

# Terminal 7 - Notification Service
npm run dev:notification
```

---

## 🧪 Testing the Setup

### 1. Check All Services Health

```bash
# Check API Gateway
curl http://localhost:3000/api/v1/health

# Check all services through gateway
curl http://localhost:3000/api/v1/health/services

# Or use the npm script
npm run health:check
```

### 2. Test Individual Services

```bash
# User Service
curl http://localhost:3001/api/v1/user/health

# Admin Service
curl http://localhost:3002/api/v1/admin/health

# Partner Service
curl http://localhost:3003/api/v1/partner/health

# Booking Service
curl http://localhost:3004/api/v1/booking/health

# Payment Service
curl http://localhost:3005/api/v1/payment/health

# Notification Service
curl http://localhost:3006/api/v1/notification/health
```

### 3. Test Authentication

To test authenticated endpoints, you need a Cognito token:

```bash
# Example authenticated request
curl -X GET http://localhost:3000/api/v1/user/profile \
  -H "Authorization: Bearer YOUR_COGNITO_ACCESS_TOKEN"
```

---

## 📚 API Documentation

### Authentication

All requests (except health checks and public webhooks) require AWS Cognito JWT token:

```
Authorization: Bearer <cognito-access-token>
```

### API Endpoints Format

```
/api/v1/{service-name}/{endpoint}
```

### Available Endpoints

**Health Checks (No Auth Required):**
- `GET /api/v1/health` - Gateway health
- `GET /api/v1/health/services` - All services health
- `GET /api/v1/user/health`
- `GET /api/v1/admin/health`
- `GET /api/v1/partner/health`
- `GET /api/v1/booking/health`
- `GET /api/v1/payment/health`
- `GET /api/v1/notification/health`

**Future Endpoints (to be implemented):**
- User: `/api/v1/user/profile`, `/api/v1/user/:id`
- Admin: `/api/v1/admin/users`, `/api/v1/admin/analytics`
- Partner: `/api/v1/partner/events`, `/api/v1/partner/revenue`
- Booking: `/api/v1/booking/create`, `/api/v1/booking/:id`
- Payment: `/api/v1/payment/initiate`, `/api/v1/payment/verify`
- Notification: `/api/v1/notification/email`, `/api/v1/notification/sms`

---

## 🔧 Troubleshooting

### Service Won't Start

**Check if port is already in use:**
```bash
lsof -i :3000  # Replace with your service port
```

**Kill process on port:**
```bash
kill -9 <PID>
```

### Docker Issues

**Remove all containers and rebuild:**
```bash
docker-compose down -v
docker-compose up -d --build
```

**View container logs:**
```bash
docker-compose logs -f api-gateway
```

### Authentication Errors

**Common issues:**
1. Invalid Cognito credentials in `.env`
2. Expired JWT token
3. Token not included in Authorization header
4. Wrong token format (should be `Bearer <token>`)

**Verify Cognito setup:**
- Check User Pool ID is correct
- Check Client ID matches your app client
- Ensure AWS region is correct
- Verify token is not expired

### Database Connection Issues

**Check database URL format:**
```
postgresql://username:password@host:port/database
```

**Test connection:**
```bash
psql postgresql://user:password@localhost:5432/tikitu_users
```

### Service Communication Issues

**Check network connectivity:**
```bash
docker network ls
docker network inspect tikitu_tikitu-network
```

---

## 🎓 Frontend Integration

In your Next.js frontend:

1. **Install AWS Amplify:**
```bash
npm install @aws-amplify/auth aws-amplify
```

2. **Configure Amplify:**
```typescript
import { Amplify } from 'aws-amplify';

Amplify.configure({
  Auth: {
    region: 'us-east-1',
    userPoolId: 'us-east-1_XXXXXXXXX',
    userPoolWebClientId: 'your-client-id',
  }
});
```

3. **Make authenticated requests:**
```typescript
import { Auth } from '@aws-amplify/auth';

const token = (await Auth.currentSession()).getAccessToken().getJwtToken();

const response = await fetch('http://localhost:3000/api/v1/user/profile', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

---

## 📦 Next Steps

1. ✅ **Implement Business Logic** in each service
2. ✅ **Add Prisma schemas** for each service's database
3. ✅ **Implement actual endpoints** (currently only health checks exist)
4. ✅ **Add validation** using class-validator DTOs
5. ✅ **Implement error handling**
6. ✅ **Add logging** (Winston, Pino)
7. ✅ **Write tests** (unit & e2e)
8. ✅ **Add API documentation** (Swagger/OpenAPI)
9. ✅ **Set up CI/CD pipeline**
10. ✅ **Deploy to AWS/Cloud**

---

## 📞 Support

If you encounter any issues:
1. Check service logs: `docker-compose logs [service-name]`
2. Verify environment variables
3. Check database connections
4. Ensure AWS Cognito is properly configured
5. Review individual service READMEs

---

**Congratulations! Your microservices architecture is ready! 🎉**

