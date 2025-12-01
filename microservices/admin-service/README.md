# Admin Service

Microservice for administrative operations in the Tikitu ticket booking application.

## Features

- 👨‍💼 Admin user management
- 📊 Analytics and reporting
- 🎟️ Event and venue management
- 🔧 System configuration
- 🏥 Health check endpoint

## API Endpoints

### Health Check
- `GET /api/v1/admin/health` - Service health status

### Future Admin Endpoints (to be implemented)
- `GET /api/v1/admin/users` - List all users
- `GET /api/v1/admin/bookings` - List all bookings
- `GET /api/v1/admin/analytics` - Get system analytics
- `POST /api/v1/admin/events` - Create events
- `PUT /api/v1/admin/events/:id` - Update events

## Setup

```bash
npm install
npm run start:dev
```

## Environment Variables

```
PORT=3002
DATABASE_URL=postgresql://user:password@localhost:5432/tikitu_admin
```

