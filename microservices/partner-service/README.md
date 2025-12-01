# Partner Service

Microservice for managing event partners and vendors in the Tikitu ticket booking application.

## Features

- 🤝 Partner/Vendor registration and management
- 🎪 Venue management
- 📅 Event creation and management
- 💰 Revenue tracking and reports
- 🏥 Health check endpoint

## API Endpoints

### Health Check
- `GET /api/v1/partner/health` - Service health status

### Future Partner Endpoints (to be implemented)
- `POST /api/v1/partner/register` - Register new partner
- `GET /api/v1/partner/profile` - Get partner profile
- `PUT /api/v1/partner/profile` - Update partner profile
- `GET /api/v1/partner/events` - List partner's events
- `POST /api/v1/partner/events` - Create new event
- `GET /api/v1/partner/revenue` - Get revenue reports

## Setup

```bash
npm install
npm run start:dev
```

## Environment Variables

```
PORT=3003
DATABASE_URL=postgresql://user:password@localhost:5432/tikitu_partners
```

