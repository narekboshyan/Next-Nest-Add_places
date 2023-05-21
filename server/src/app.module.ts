import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import * as depthLimit from 'graphql-depth-limit';

import { ScheduleModule } from '@nestjs/schedule';
import { DatabaseModule } from '@Src/database/database.module';
import { validate } from '@Validations/env.validation';
import Modules from '@Src/modules';
import { LoggingInterceptor } from '@Src/interceptors/logging.interceptor';

/*
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: true,
      driver: ApolloDriver,
      debug: true,
      playground: true,
      context: ({ req, res }) => ({ req, res }),
    }),

*/
@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: `.${process.env.NODE_ENV || 'development'}.env`,
      validate,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      include: Modules,
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
      context: ({ req, res }) => ({ req, res }),
      path: '/',
      nodeEnv: 'development',
      validationRules: [depthLimit(5)],
      buildSchemaOptions: {
        dateScalarMode: 'timestamp',
        numberScalarMode: 'integer',
        noDuplicatedFields: true,
      },
    }),
    ...Modules,
    DatabaseModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
