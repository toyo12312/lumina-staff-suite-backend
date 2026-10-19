import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';
import { ClientSecretGuard } from './common/guards/client-secret.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());

  app.use(
    ['/api/docs', '/api/docs-json'],
    basicAuth({
      challenge: true,
      users: {
        admin: process.env.SWAGGER_PASSWORD || 'admin',
      },
    }),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      stopAtFirstError: true,
      transform: true,
    }),
  );

  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'x-lumina-client-secret'],
  });

  app.useGlobalGuards(new ClientSecretGuard());

  const config = new DocumentBuilder()
    .setTitle('Lumina Staff Suite API')
    .setDescription('Lumina API documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 8080;
  await app.listen(port, '0.0.0.0');
  console.log(`Application is running on port: ${port}`);
}
bootstrap();
