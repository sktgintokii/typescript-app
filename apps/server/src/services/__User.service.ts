// import { Repository } from 'typeorm'
// import User from '../entities/User'
// import BcryptService from './Bcrypt.service'
// import { injectable } from 'inversify'

// @injectable()
// export default class UserService {
//   private repository: Repository<User>
//   private bcryptService: BcryptService

//   public constructor(repository: Repository<User>, bcryptService: BcryptService) {
//     this.repository = repository
//     this.bcryptService = bcryptService
//   }

//   public findOne = this.repository.findOne

//   public hashPassword(password: string): string {
//     return this.bcryptService.hashSync(password, 10)
//   }

//   public async signUpByEmail({
//     email,
//     name,
//     password,
//   }: {
//     email: string
//     name: string
//     password: string
//   }): Promise<User | null> {
//     const user = this.repository.create({ email, name, password: this.hashPassword(password) })
//     await this.repository.save(user)
//     return user
//   }
// }
