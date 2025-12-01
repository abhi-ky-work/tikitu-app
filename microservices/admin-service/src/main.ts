import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.setGlobalPrefix('api/v1/admin');

  const port = process.env.PORT || 3002;
  await app.listen(port);
  
  console.log(`🚀 Admin Service is running on: http://localhost:${port}`);
  console.log(`📊 Health check: http://localhost:${port}/api/v1/admin/health`);
}

bootstrap();

