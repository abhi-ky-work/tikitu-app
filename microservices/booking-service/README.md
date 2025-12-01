# Booking Service

Microservice for managing ticket bookings in the Tikitu application.

## Features

- 🎟️ Ticket booking management
- 🔒 Seat reservation and locking
- 📋 Booking history
- ✅ Booking confirmation
- ❌ Cancellation handling
- 🏥 Health check endpoint

## API Endpoints

### Health Check
- `GET /api/v1/booking/health` - Service health status

### Future Booking Endpoints (to be implemented)
- `POST /api/v1/booking/create` - Create new booking
- `GET /api/v1/booking/:id` - Get booking details
- `GET /api/v1/booking/user/:userId` - Get user's bookings
- `PUT /api/v1/booking/:id/confirm` - Confirm booking
- `DELETE /api/v1/booking/:id` - Cancel booking
- `POST /api/v1/booking/seats/lock` - Lock seats temporarily
- `POST /api/v1/booking/seats/release` - Release locked seats

## Setup

```bash
npm install
npm run start:dev
```

## Environment Variables

```
PORT=3004
DATABASE_URL=postgresql://user:password@localhost:5432/tikitu_bookings
PAYMENT_SERVICE_URL=http://localhost:3005
NOTIFICATION_SERVICE_URL=http://localhost:3006
```

