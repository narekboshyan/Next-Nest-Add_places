"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const port = process.env.PORT || 5001;
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        abortOnError: false,
        autoFlushLogs: true,
        bodyParser: true,
        cors: {
            origin: '*',
            credentials: true,
            allowedHeaders: '*',
        },
    });
    app.use(session({
        secret: 'suitecx',
        cookie: {
            secure: process.env['NODE_ENV'] === 'production',
            domain: process.env['NODE_ENV'] === 'development'
                ? 'localhost'
                : process.env.FRONTEND_URL,
            httpOnly: true,
        },
        resave: false,
        saveUninitialized: false,
    }));
    app.use(cookieParser());
    app.setGlobalPrefix('/api/v1');
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true }));
    const config = new swagger_1.DocumentBuilder()
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(port);
    console.log(`Application is running on port ${port}`);
}
bootstrap().catch((err) => console.error(err));
//# sourceMappingURL=main.js.map