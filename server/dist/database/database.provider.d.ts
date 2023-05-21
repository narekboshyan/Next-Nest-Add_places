import { Sequelize } from 'sequelize-typescript';
export declare const DB: Sequelize;
export declare const databaseProviders: {
    provide: string;
    useFactory: () => Promise<Sequelize>;
};
