import User from '../entities/User'

export default class Context {
  public user: User

  constructor({ user }: { user?: User }) {
    this.user = user
  }
}
