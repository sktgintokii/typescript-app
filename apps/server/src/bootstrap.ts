import { Container } from 'inversify'

import { TYPES } from './ioc/types'

import dotEnvLoader from './loaders/dotEnv.loader'
import typeOrmConnectionLoader from './loaders/typeOrmConnection.loader'

import ConfigService, { TypeOrmConfig } from './services/Config.service'
import UserService from './services/User.service'
import UserResolver from './resolvers/User.resolver'
import DBService from 'services/DB.service'

export const bootstrapConfigService = async (): Promise<ConfigService> => {
  const env = await dotEnvLoader()

  const configService: ConfigService = new ConfigService({
    express: {
      port: parseInt(env.EXPRESS_PORT || '', 10) || 4000,
    },
    typeorm: {
      type: env.TYPEORM_TYPE,
      host: env.TYPEORM_HOST,
      port: env.TYPEORM_PORT,
      username: env.TYPEORM_USERNAME,
      password: env.TYPEORM_PASSWORD,
      database: env.TYPEORM_DATABASE,
      entities: env.TYPEORM_ENTITIES,
      synchronize: env.TYPEORM_SYNCHRONIZE === 'true',
      logging: env.TYPEORM_LOGGING === 'true',
    } as TypeOrmConfig,
  })

  return configService
}

export const bootstrapDBService = async (configService: ConfigService): Promise<DBService> => {
  const conn = await typeOrmConnectionLoader(configService.typeorm)
}

export const bootstrap = async (): Promise<void> => {
  const container = new Container()
  const configService = await bootstrapConfigService()
  const dbService = await bootstrapDBService(configService)

  container.bind<ConfigService>(TYPES.ConfigService).toConstantValue(configService)
  container.bind<UserService>(UserService).toSelf()
  container.bind<UserResolver>(UserResolver).toSelf()
}

export default bootstrap
