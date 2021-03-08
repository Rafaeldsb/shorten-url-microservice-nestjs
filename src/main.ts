import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      port: 4000,
    },
  });

  app.useGlobalPipes(new ValidationPipe());

  await app.startAllMicroservicesAsync();
  await app.listen(3000, () => console.log('Application is listening...'));
}

bootstrap();
