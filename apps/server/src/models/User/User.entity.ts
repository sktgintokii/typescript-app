import { IsEmail, MinLength } from 'class-validator'
import { Field, Int, ObjectType } from 'type-graphql'
import { BaseEntity, Column, Index, Entity, PrimaryGeneratedColumn } from 'typeorm'

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
  @IsEmail({}, { message: 'Invalid email' })
  public email!: string

  @Column()
  @MinLength(0)
  public password!: string
}
