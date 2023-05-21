import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Table,
} from 'sequelize-typescript';
import { BaseModel } from './base.model';
import { Place } from './place';

@ObjectType()
@Table({ tableName: 'users', timestamps: true })
export class User extends BaseModel<User> {
  @Field()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  fullName: string;

  @Field()
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Field()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Field()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  image: string;

  @ForeignKey(() => User)
  @HasMany(() => Place)
  visitorAction: Place[];

  accessToken?: string;
}
