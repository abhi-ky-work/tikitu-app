import { NestFactory } from '@nestjs/core';
import { PaymentServiceModule } from './payment-service.module';

async function bootstrap() {
  const app = await NestFactory.create(PaymentServiceModule);
  await app.listen(process.env.port ?? 3006);
  console.log('Payment service is running on', `http://localhost:${process.env.port ?? 3000}`);
}
bootstrap();
