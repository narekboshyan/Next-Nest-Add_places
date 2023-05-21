"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseProviders = exports.DB = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const database_config_1 = require("./database.config");
const models_1 = require("./models");
exports.DB = new sequelize_typescript_1.Sequelize(database_config_1.databaseConfig);
exports.databaseProviders = {
    provide: 'SEQUELIZE',
    useFactory: async () => {
        exports.DB.addModels(models_1.models);
        await exports.DB.sync();
        return exports.DB;
    },
};
//# sourceMappingURL=database.provider.js.map