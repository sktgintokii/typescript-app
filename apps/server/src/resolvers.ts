import { Resolver, Arg, Query, Ctx, Mutation } from 'type-graphql'
import { InjectRepository } from 'typeorm-typedi-extensions'
import Context from './types/Context'
import User from './models/User/User.entity'
import UserRepository from './models/User/User.repository'

@Resolver()
export class UserQuery {
  @InjectRepository(User)
  private userRepository: UserRepository

  @Query(() => User)
  async user(@Arg('id') id: number): Promise<User | null> {
    const user = await this.userRepository.findOne(id)
    return user
  }
}

@Resolver()
export class SignUpByEmailMutation {
  @InjectRepository(User)
  private userRepository: UserRepository

  @Mutation(() => User)
  async signUpByEmail(
    @Ctx('ctx') ctx: Context,
    @Arg('name') name: string,
    @Arg('email') email: string,
    @Arg('password') password: string,
  ): Promise<User> {
    const user = await this.userRepository.signUpByEmail(ctx, {
      name,
      email,
      password,
    })
    return user
  }
}
