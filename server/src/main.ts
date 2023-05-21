import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';

import { AppModule } from '@Src/app.module';

async function bootstrap() {
  const port = process.env.PORT || 5001;

  const app = await NestFactory.create(AppModule, {
    abortOnError: false,
    autoFlushLogs: true,
    bodyParser: true,
    cors: {
      origin: '*',
      credentials: true,
      allowedHeaders: '*',
    },
  });

  app.use(
    session({
      secret: 'suitecx',
      cookie: {
        secure: process.env['NODE_ENV'] === 'production',
        domain:
          process.env['NODE_ENV'] === 'development'
            ? 'localhost'
            : process.env.FRONTEND_URL,
        httpOnly: true,
      },
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.use(cookieParser());
  app.setGlobalPrefix('/api/v1');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const config = new DocumentBuilder()
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(port);
  console.log(`Application is running on port ${port}`);
}

bootstrap().catch((err) => console.error(err));
