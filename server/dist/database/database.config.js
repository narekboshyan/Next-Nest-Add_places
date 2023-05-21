"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = exports.databaseConfig = void 0;
const dotenv = require("dotenv");
const sequelize_typescript_1 = require("sequelize-typescript");
dotenv.config();
const logging = process.env.NODE_ENV === 'development' ? false : console.log;
exports.databaseConfig = {
    dialect: 'mysql',
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    logging,
};
exports.sequelize = new sequelize_typescript_1.Sequelize(exports.databaseConfig);
//# sourceMappingURL=database.config.js.map