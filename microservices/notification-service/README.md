# Notification Service

Microservice for handling all notifications in the Tikitu ticket booking application.

## Features

- 📧 Email notifications (AWS SES, SendGrid, etc.)
- 📱 SMS notifications (Twilio, AWS SNS, etc.)
- 🔔 Push notifications
- 📨 Notification templates
- 📊 Notification tracking and logs
- 🏥 Health check endpoint

## API Endpoints

### Health Check
- `GET /api/v1/notification/health` - Service health status

### Future Notification Endpoints (to be implemented)
- `POST /api/v1/notification/email` - Send email notification
- `POST /api/v1/notification/sms` - Send SMS notification
- `POST /api/v1/notification/push` - Send push notification
- `GET /api/v1/notification/templates` - List notification templates
- `POST /api/v1/notification/templates` - Create notification template
- `GET /api/v1/notification/logs` - Get notification logs

## Notification Types

- Booking confirmation
- Payment receipt
- Event reminders
- Cancellation notifications
- Partner updates
- System alerts

## Setup

```bash
npm install
npm run start:dev
```

## Environment Variables

```
PORT=3006
DATABASE_URL=postgresql://user:password@localhost:5432/tikitu_notifications
AWS_SES_REGION=us-east-1
AWS_SES_ACCESS_KEY=your-access-key
AWS_SES_SECRET_KEY=your-secret-key
TWILIO_ACCOUNT_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-token
TWILIO_PHONE_NUMBER=+1234567890
```

