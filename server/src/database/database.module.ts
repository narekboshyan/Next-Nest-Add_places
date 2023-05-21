import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { databaseConfig } from './database.config';
import { models } from './models';

@Module({
  imports: [SequelizeModule.forRoot({ ...databaseConfig, models })],
})
export class DatabaseModule {}
