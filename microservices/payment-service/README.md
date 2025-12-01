# Payment Service

Microservice for handling payment processing in the Tikitu ticket booking application.

## Features

- 💳 Payment gateway integration (Stripe, PayPal, etc.)
- 💰 Transaction management
- 🔐 Secure payment processing
- 🧾 Invoice generation
- 💸 Refund handling
- 🏥 Health check endpoint

## API Endpoints

### Health Check
- `GET /api/v1/payment/health` - Service health status

### Future Payment Endpoints (to be implemented)
- `POST /api/v1/payment/initiate` - Initiate payment
- `POST /api/v1/payment/verify` - Verify payment status
- `GET /api/v1/payment/:id` - Get payment details
- `POST /api/v1/payment/:id/refund` - Process refund
- `GET /api/v1/payment/transactions` - List transactions
- `POST /api/v1/payment/webhook` - Handle payment gateway webhooks

## Setup

```bash
npm install
npm run start:dev
```

## Environment Variables

```
PORT=3005
DATABASE_URL=postgresql://user:password@localhost:5432/tikitu_payments
STRIPE_SECRET_KEY=your-stripe-secret-key
STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret
BOOKING_SERVICE_URL=http://localhost:3004
NOTIFICATION_SERVICE_URL=http://localhost:3006
```

