# User Service

Microservice for managing user operations in the Tikitu ticket booking application.

## Features

- 👤 User profile management
- 🔍 User search and retrieval
- 📝 User data updates
- 🏥 Health check endpoint

## API Endpoints

### Health Check
- `GET /api/v1/user/health` - Service health status

### Future User Endpoints (to be implemented)
- `GET /api/v1/user/profile` - Get user profile
- `PUT /api/v1/user/profile` - Update user profile
- `GET /api/v1/user/:id` - Get user by ID
- `DELETE /api/v1/user/:id` - Delete user

## Setup

```bash
npm install
npm run start:dev
```

## Environment Variables

```
PORT=3001
DATABASE_URL=postgresql://user:password@localhost:5432/tikitu_users
```

