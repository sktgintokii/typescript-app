import * as bcrypt from 'bcryptjs'
import { Service } from 'typedi'

@Service()
export default class BcryptService {
  public hashSync = bcrypt.hashSync
}
