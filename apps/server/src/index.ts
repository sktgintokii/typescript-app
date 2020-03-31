import 'reflect-metadata'
import { resolve, join } from 'path'
import { ApolloServer } from 'apollo-server-express'
import * as Express from 'express'
import { buildSchema } from 'type-graphql'
import UserResolver from './resolvers/User.resolver'
// import { createConnection } from 'typeorm'
// // import { Container } from 'typedi'
// import { Container } from 'inversify'
// import { useContainer as ormUseContainer } from 'typeorm'
// import Context from './Context'
// import * as resolvers from './resolvers'

import { Container, injectable, inject } from 'inversify'
// import { Config, ConfigProvider, ConfigProviderSymbol } from './providers/Config.provider'
// import { bind } from './inversify.config'

import ConfigService, { TypeOrmConfig } from './services/Config.service'
import DBService from './services/DB.service'
import { createConnection } from 'typeorm'
import UserService from './services/User.service'

const main = async (): Promise<void> => {
  const container = new Container()

  // Bind ConfigService
  config({ path: resolve(__dirname, '../.env') })
  const configService: ConfigService = new ConfigService({
    express: {
      port: parseInt(process.env.EXPRESS_PORT || '', 10) || 4000,
    },
    typeorm: {
      type: 'postgres',
      host: process.env.TYPEORM_HOST || 'localhost',
      port: process.env.TYPEORM_PORT || 5432,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [resolve(__dirname, './entities/*')],
      synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
      // logging: process.env.TYPEORM_LOGGING === 'true',
    } as TypeOrmConfig,
  })
  container.bind(ConfigService).toConstantValue(configService)

  // Bind DBService
  const conn = await createConnection(configService.typeorm)
  const dbService: DBService = await new DBService(conn)
  container.bind(DBService).toConstantValue(dbService)

  container.bind<UserService>(UserService).toSelf()
  container.bind<UserResolver>(UserResolver).toSelf()

  const schema = await buildSchema({
    resolvers: [UserResolver],
    emitSchemaFile: true,
    container,
  })
  const apolloServer = new ApolloServer({
    schema,
  })

  const app = Express()
  apolloServer.applyMiddleware({ app })
  app.listen(4000, () => {
    console.log('🚀 Server ready at localhost:4000')
  })
}

main().catch(console.error)
