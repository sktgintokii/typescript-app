import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-express'
import * as Express from 'express'
import { buildSchema } from 'type-graphql'
import { createConnection } from 'typeorm'
import Context from './types/Context'
import * as resolvers from './resolvers'

const main = async (): Promise<void> => {
  await createConnection()

  const schema = await buildSchema({
    resolvers: Object.values(resolvers),
    emitSchemaFile: true,
  })
  const apolloServer = new ApolloServer({
    schema,
    context: (): Context => {
      return new Context({})
    },
  })

  const app = Express()
  apolloServer.applyMiddleware({ app })
  app.listen(4000, () => {
    console.log('Server started on localhost:4000')
  })
}

main().catch(console.error)
