import { ApolloServer } from 'apollo-server-express'
import * as Express from 'express'
import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import { createConnection } from 'typeorm'
import Context from './types/Context'

const main = async (): Promise<void> => {
  await createConnection()

  const schema = await buildSchema({
    resolvers: [`${__dirname}/resolvers/*/*.resolver.ts`],
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

main()
