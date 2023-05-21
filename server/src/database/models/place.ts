import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Table,
} from 'sequelize-typescript';
import { BaseModel } from './base.model';
import { User } from './user';

export enum Location {
  LAT = 'LAT',
  LNG = 'LNG',
}

registerEnumType(Location, {
  name: 'Location',
});

@ObjectType()
@Table({ tableName: 'places', timestamps: true })
export class Place extends BaseModel<Place> {
  @Field()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Field()
  @Column({
    type: DataType.TEXT,
    allowNull: false,
    unique: true,
  })
  description: string;

  @Field()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  image: string;

  @Field()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  address: string;

  @Field(() => Location)
  @Column({
    type: DataType.ENUM({
      values: Object.values(Location),
    }),
    allowNull: false,
  })
  location: Location;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @Field(() => User)
  @BelongsTo(() => User, { foreignKey: 'userId', as: 'user' })
  user: User;
}
