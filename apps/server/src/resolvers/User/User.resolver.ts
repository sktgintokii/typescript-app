import { Resolver, Arg, Mutation, Query, Ctx } from 'type-graphql'
import { getCustomRepository } from 'typeorm'
import Context from '../../types/Context'
import User from '../../entities/User'
import UserRepository from '../../repositories/User.repository'

@Resolver(User)
export default class UserResolver {
  private userRepository: UserRepository = getCustomRepository(UserRepository)

  @Query(() => User)
  async user(@Arg('id') id: number): Promise<User | undefined> {
    const user = await this.userRepository.findOne(id)
    return user
  }

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
