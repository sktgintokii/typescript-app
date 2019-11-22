import { EntityRepository, Repository } from 'typeorm'
import User from '../entities/User'
import bcrypt from '../stores/bcrypt'
import Context from '../types/Context'

@EntityRepository(User)
export default class UserRepository extends Repository<User> {
  public async isEmailUsed(
    ctx: Context,
    { email }: { email: string },
  ): Promise<boolean> {
    const user = await this.findOne({ email })
    return !!user
  }

  public async signUpByEmail(
    ctx: Context,
    {
      email,
      name,
      password,
    }: { email: string; name: string; password: string },
  ): Promise<User | null> {
    const encryptedPassword = bcrypt.hashSync(password, 10)
    const user = await this.create({ email, name, password: encryptedPassword })
    await user.save()
    return user
  }
}
