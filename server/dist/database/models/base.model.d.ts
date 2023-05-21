import { Model } from 'sequelize-typescript';
export declare class BaseModel<T> extends Model<T> {
    id: number;
    createdAt: Date;
    updatedAt: Date;
}
