import { Connection, Repository, BaseEntity, ObjectType } from 'typeorm'
import { injectable } from 'inversify'

@injectable()
export default class DBService {
  private _conn: Connection

  public constructor(conn: Connection) {
    this._conn = conn
  }

  public getRepository<T>(entity: ObjectType<T>): Repository<T> {
    return this._conn.getRepository(entity)
  }
}
