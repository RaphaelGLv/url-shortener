import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const validationPipe = new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  })

  app.useGlobalPipes(validationPipe);

  const version = configService.get<string>('VERSION') ?? 'unknown';
  app.setGlobalPrefix(`api/v${version}`);

  await app.listen(configService.get<number>('PORT') ?? 3001);
}
bootstrap();
