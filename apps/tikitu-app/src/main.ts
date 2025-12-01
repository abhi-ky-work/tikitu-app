import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3001;
  console.log('Application is running on', `http://localhost:${port}`);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }));
  await app.listen(port);
}
bootstrap();
