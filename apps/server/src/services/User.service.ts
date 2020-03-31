import { DeepPartial } from 'typeorm'
import { injectable } from 'inversify'
import DBService from './DB.service'
import User from '../entities/User.entity'

@injectable()
export default class UserService {
  private _dbService: DBService

  public constructor(dbService: DBService) {
    this._dbService = dbService
  }

  public async create(user: DeepPartial<User>): Promise<User> {
    return this._dbService.getRepository(User).create(user)
  }

  public async register(options: { firstName: string; lastName: string }): Promise<User> {
    return this.create({
      firstName: options.firstName,
      lastName: options.lastName,
      isActive: false,
      password: 'ok',
    })
  }
}
