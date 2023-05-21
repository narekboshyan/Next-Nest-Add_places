import { Field, ObjectType } from '@nestjs/graphql';
import { Column, DataType, Model } from 'sequelize-typescript';

@ObjectType()
export class BaseModel<T> extends Model<T> {
  @Field()
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  })
  id: number;

  @Field()
  @Column({ type: DataType.DATE })
  createdAt: Date;

  @Field()
  @Column({ type: DataType.DATE })
  updatedAt: Date;
}
