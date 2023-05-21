declare class EnvironmentVariables {
    PORT: number;
    MYSQL_USER: string;
    MYSQL_PASSWORD: string;
    MYSQL_DATABASE: string;
    MYSQL_HOST: string;
    MYSQL_PORT: number;
    CLIENT_ID: string;
    APP_KEY: string;
    CLIENT_SECRET: string;
    CALLBACK_URL: string;
    GENERATE_TOKEN_URL: string;
    GET_ME: string;
    QUESTION_PRO_API: string;
    REDIS_HOST: string;
    REDIS_PORT: number;
    REDIS_PASSWORD: string;
    REDIS_URL: string;
}
export declare function validate(config: Record<string, unknown>): EnvironmentVariables;
export {};
