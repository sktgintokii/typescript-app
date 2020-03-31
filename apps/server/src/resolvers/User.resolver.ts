import { Resolver, Query, Field, ObjectType, Mutation, InputType, Arg } from 'type-graphql'
import UserService from '../services/User.service'
import User from 'entities/User.entity'
import { injectable } from 'inversify'

@ObjectType()
class UserType implements User {
  @Field()
  id!: string

  @Field()
  firstName!: string

  @Field()
  lastName!: string

  @Field()
  isActive!: boolean

  @Field()
  password!: string
}

@InputType()
class RegisterInputType implements Partial<UserType> {
  @Field()
  firstName!: string

  @Field()
  lastName!: string

  @Field()
  password!: string
}

@injectable()
@Resolver(of => UserType)
export default class UserResolver {
  private _userService: UserService

  public constructor(userService: UserService) {
    this._userService = userService
  }

  @Query(returns => [UserType])
  public async users(): Promise<User[]> {
    const users: User[] = await this._userService.findAll()

    return users
  }

  @Mutation(returns => Boolean)
  public async register(@Arg('input') input: RegisterInputType): Promise<boolean> {
    await this._userService.register({
      firstName: input.firstName,
      lastName: input.lastName,
    })

    return true
  }
}
