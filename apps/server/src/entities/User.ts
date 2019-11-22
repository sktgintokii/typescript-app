import { IsEmail, MinLength } from 'class-validator'
import { Field, Int, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm'
// import { IsUserEmailUsed } from './../decorators/validators'

@ObjectType()
@Entity()
export default class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  public id!: number

  @Field()
  @Column()
  public name!: string

  @Field()
  @Index({ unique: true })
  @Column()
  @IsEmail()
  // @IsUserEmailUsed({
  //   message: 'Email $value already exists.',
  // })
  public email!: string

  @Column()
  @MinLength(0)
  public password!: string
}
