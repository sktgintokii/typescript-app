import User from '../models/User/User.entity'

export default class Context {
  public user: User

  constructor({ user }: { user?: User }) {
    this.user = user
  }
}
