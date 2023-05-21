import { Request } from 'express';
import { Transaction } from 'sequelize';
export interface IRequest extends Request {
    transaction: Transaction;
}
export declare class RequestService {
    private request;
    req: IRequest;
    constructor(request: any);
    getTransaction(): Transaction;
}
