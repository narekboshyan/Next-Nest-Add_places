"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CUE_CARD_LOGO_URL = exports.CRYPTO_SECRET = exports.AWS_SECRET_KEY = exports.AWS_ACCESS_KEY = exports.AWS_BUCKET_REGION = exports.AWS_BUCKET_NAME = exports.ZOOM_WEBHOOK_SECRET = exports.ZOOM_REDIRECT_URL = exports.ZOOM_CLIENT_SECRET = exports.ZOOM_CLIENT_ID = exports.ZOOM_APIS_URL = exports.HUBSPOT_URL = exports.CLEARBIT_COMPANY_URL = exports.CLEARBIT_API_KEY = exports.NOT_ALLOWED_EMAILS = exports.OPENAI_API_KEY = exports.OPENAI_API_URL = exports.GOOGLE_CUSTOM_SEARCH_ENGINE_ID = exports.GOOGLE_API_KEY = exports.GOOGLE_CUSTOM_SEARCH_URL = exports.GOOGLE_APIS_URL = exports.GOOGLE_CLIENT_SECRET = exports.GOOGLE_CLIENT_ID = exports.JWT_BASE_OPTIONS = exports.JWT_REFRESH_TOKEN_EXPIRATION_TIME = exports.JWT_REFRESH_TOKEN_SECRET = exports.JWT_ACCESS_TOKEN_EXPIRATION_TIME = exports.JWT_ACCESS_TOKEN_SECRET = exports.JWT_CONSTANTS = exports.NODE_ENV = exports.SELF_URL = exports.SESSION_SECRET = exports.PORT = exports.ORIGINS = exports.IS_PRODUCTION = exports.ENV = void 0;
exports.ENV = process.env.ENV || 'development';
exports.IS_PRODUCTION = exports.ENV === 'production';
exports.ORIGINS = [process.env.ORIGIN];
exports.PORT = Number(process.env.PORT);
exports.SESSION_SECRET = process.env.SESSION_SECRET;
exports.SELF_URL = process.env.SELF_URL;
exports.NODE_ENV = process.env.NODE_ENV;
exports.JWT_CONSTANTS = JSON.parse(process.env.JWT_CONSTANTS);
exports.JWT_ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET;
exports.JWT_ACCESS_TOKEN_EXPIRATION_TIME = process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME;
exports.JWT_REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_TOKEN_SECRET;
exports.JWT_REFRESH_TOKEN_EXPIRATION_TIME = process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME;
exports.JWT_BASE_OPTIONS = {
    issuer: exports.JWT_CONSTANTS.issuer,
    audience: exports.JWT_CONSTANTS.audience,
};
exports.GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
exports.GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
exports.GOOGLE_APIS_URL = process.env.GOOGLE_APIS_URL;
exports.GOOGLE_CUSTOM_SEARCH_URL = process.env.GOOGLE_CUSTOM_SEARCH_URL;
exports.GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
exports.GOOGLE_CUSTOM_SEARCH_ENGINE_ID = process.env.GOOGLE_CUSTOM_SEARCH_ENGINE_ID;
exports.OPENAI_API_URL = process.env.OPENAI_API_URL;
exports.OPENAI_API_KEY = process.env.OPENAI_API_KEY;
exports.NOT_ALLOWED_EMAILS = ['gmail', 'outlook', 'yahoo'];
exports.CLEARBIT_API_KEY = process.env.CLEARBIT_API_KEY;
exports.CLEARBIT_COMPANY_URL = process.env.CLEARBIT_COMPANY_URL;
exports.HUBSPOT_URL = process.env.HUBSPOT_URL;
exports.ZOOM_APIS_URL = process.env.ZOOM_APIS_URL;
exports.ZOOM_CLIENT_ID = process.env.ZOOM_CLIENT_ID;
exports.ZOOM_CLIENT_SECRET = process.env.ZOOM_CLIENT_SECRET;
exports.ZOOM_REDIRECT_URL = process.env.ZOOM_REDIRECT_URL;
exports.ZOOM_WEBHOOK_SECRET = process.env.ZOOM_WEBHOOK_SECRET;
exports.AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;
exports.AWS_BUCKET_REGION = process.env.AWS_BUCKET_REGION;
exports.AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
exports.AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
exports.CRYPTO_SECRET = process.env.CRYPTO_SECRET;
exports.CUE_CARD_LOGO_URL = process.env.CUE_CARD_LOGO_URL;
//# sourceMappingURL=config.js.map