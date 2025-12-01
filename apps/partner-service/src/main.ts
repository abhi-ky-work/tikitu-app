import { NestFactory } from '@nestjs/core';
import { PartnerServiceModule } from './partner-service.module';

async function bootstrap() {
  const app = await NestFactory.create(PartnerServiceModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
