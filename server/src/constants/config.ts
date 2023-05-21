import { SignOptions } from 'jsonwebtoken';

export const ENV = process.env.ENV || 'development';
export const IS_PRODUCTION = ENV === 'production';

export const ORIGINS = [process.env.ORIGIN];
export const PORT = Number(process.env.PORT);
export const SESSION_SECRET = process.env.SESSION_SECRET;
export const SELF_URL = process.env.SELF_URL;
export const NODE_ENV = process.env.NODE_ENV;

export const JWT_CONSTANTS = JSON.parse(process.env.JWT_CONSTANTS);
export const JWT_ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET;
export const JWT_ACCESS_TOKEN_EXPIRATION_TIME =
  process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME;
export const JWT_REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_TOKEN_SECRET;
export const JWT_REFRESH_TOKEN_EXPIRATION_TIME =
  process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME;
export const JWT_BASE_OPTIONS: SignOptions = {
  issuer: JWT_CONSTANTS.issuer,
  audience: JWT_CONSTANTS.audience,
};

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
export const GOOGLE_APIS_URL = process.env.GOOGLE_APIS_URL;
export const GOOGLE_CUSTOM_SEARCH_URL = process.env.GOOGLE_CUSTOM_SEARCH_URL;
export const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
export const GOOGLE_CUSTOM_SEARCH_ENGINE_ID =
  process.env.GOOGLE_CUSTOM_SEARCH_ENGINE_ID;

export const OPENAI_API_URL = process.env.OPENAI_API_URL;
export const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export const NOT_ALLOWED_EMAILS = ['gmail', 'outlook', 'yahoo'];

export const CLEARBIT_API_KEY = process.env.CLEARBIT_API_KEY;
export const CLEARBIT_COMPANY_URL = process.env.CLEARBIT_COMPANY_URL;

export const HUBSPOT_URL = process.env.HUBSPOT_URL;

export const ZOOM_APIS_URL = process.env.ZOOM_APIS_URL;
export const ZOOM_CLIENT_ID = process.env.ZOOM_CLIENT_ID;
export const ZOOM_CLIENT_SECRET = process.env.ZOOM_CLIENT_SECRET;
export const ZOOM_REDIRECT_URL = process.env.ZOOM_REDIRECT_URL;
export const ZOOM_WEBHOOK_SECRET = process.env.ZOOM_WEBHOOK_SECRET;

export const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;
export const AWS_BUCKET_REGION = process.env.AWS_BUCKET_REGION;
export const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
export const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;

export const CRYPTO_SECRET = process.env.CRYPTO_SECRET;
export const CUE_CARD_LOGO_URL = process.env.CUE_CARD_LOGO_URL;
