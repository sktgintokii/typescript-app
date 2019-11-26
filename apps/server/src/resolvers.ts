import { Resolver, Arg, Query, Ctx, Mutation } from 'type-graphql'
import { getCustomRepository } from 'typeorm'
import Context from './types/Context'
import User from './models/User/User.entity'
import UserRepository from './models/User/User.repository'

@Resolver(User)
export class UserQuery {
  private userRepository: UserRepository = getCustomRepository(UserRepository)

  @Query(returns => User)
  async user(@Arg('id') id: number): Promise<User | undefined> {
    const user = await this.userRepository.findOne(id)
    return user
  }
}

@Resolver()
export class SignUpByEmailMutation {
  private userRepository: UserRepository = getCustomRepository(UserRepository)

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
