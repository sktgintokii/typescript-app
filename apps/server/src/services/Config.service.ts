import { ConnectionOptions } from 'typeorm'

export interface ExpressConfig {
  port: string | number
}

export { ConnectionOptions as TypeOrmConfig }
// export interface TypeOrmConfig {
//   type: string | undefined
//   host: string | undefined
//   port: string | number | undefined
//   username: string | undefined
//   password: string | undefined
//   database: string | undefined
//   entities: string[] | undefined
// }
export interface Config {
  express: ExpressConfig
  typeorm: ConnectionOptions
}

export default class ConfigService {
  public express: ExpressConfig
  public typeorm: ConnectionOptions

  public constructor(config: Config) {
    this.express = config.express
    this.typeorm = config.typeorm
  }
}
