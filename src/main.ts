import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { TransformInterceptor } from './interceptor/response_success.interceptor';
import { FilterException } from './interceptor/response_error.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')
  app.useGlobalInterceptors(new TransformInterceptor())
  app.useGlobalFilters(new FilterException())
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    enableDebugMessages: true
  }))
  app.useLogger(new Logger())
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
