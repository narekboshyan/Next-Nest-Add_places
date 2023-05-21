import * as dotenv from 'dotenv';
import { Options } from 'sequelize/types/sequelize';
import { Sequelize } from 'sequelize-typescript';

dotenv.config();

const logging = process.env.NODE_ENV === 'development' ? false : console.log;

export const databaseConfig: Options = {
  dialect: 'mysql',
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  logging,
};

export const sequelize = new Sequelize(databaseConfig);
