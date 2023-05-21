import { BaseModel } from './base.model';
import { User } from './user';
export declare enum Location {
    LAT = "LAT",
    LNG = "LNG"
}
export declare class Place extends BaseModel<Place> {
    title: string;
    description: string;
    image: string;
    address: string;
    location: Location;
    userId: number;
    user: User;
}
