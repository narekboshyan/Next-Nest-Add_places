import { Sequelize } from 'sequelize-typescript';

import { databaseConfig } from './database.config';
import { models } from './models';

export const DB = new Sequelize(databaseConfig);
export const databaseProviders = {
  provide: 'SEQUELIZE',
  useFactory: async () => {
    DB.addModels(models);
    await DB.sync();
    return DB;
  },
};
