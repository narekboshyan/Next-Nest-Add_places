"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const graphql_1 = require("@nestjs/graphql");
const apollo_1 = require("@nestjs/apollo");
const depthLimit = require("graphql-depth-limit");
const schedule_1 = require("@nestjs/schedule");
const database_module_1 = require("./database/database.module");
const env_validation_1 = require("./validations/env.validation");
const modules_1 = require("./modules");
const logging_interceptor_1 = require("./interceptors/logging.interceptor");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            schedule_1.ScheduleModule.forRoot(),
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                cache: true,
                envFilePath: `.${process.env.NODE_ENV || 'development'}.env`,
                validate: env_validation_1.validate,
            }),
            graphql_1.GraphQLModule.forRoot({
                include: modules_1.default,
                driver: apollo_1.ApolloDriver,
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
            ...modules_1.default,
            database_module_1.DatabaseModule,
        ],
        providers: [
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: logging_interceptor_1.LoggingInterceptor,
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map