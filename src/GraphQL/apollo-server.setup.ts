import path from 'path'
import { ApolloServer } from 'apollo-server-express'
import { Express } from 'express'
import { buildSchema } from 'type-graphql'
import resolvers from '@graphql/resolvers'
import scalars from '@graphql/scalars'
import middlewares from '@graphql/middlewares'

export default {
  configure
}

async function configure (app: Express) {
  const schema = await buildSchema({
    resolvers,
    emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
    scalarsMap: [...scalars],
    globalMiddlewares: [...middlewares]
  })

  const server = new ApolloServer({
    debug: true,
    schema
  })

  server.applyMiddleware({ app })
}
