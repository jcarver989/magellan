import { ApolloServer, gql } from 'apollo-server'
import { readFileSync } from 'fs'
import { DocumentNode } from 'graphql'
import { createContext } from './createContext'
import { resolvers } from './resolvers'

process.env.AWS_PROFILE = 'Okta_Ginger_Dev_Admin'
process.env.AWS_REGION = 'us-west-2'

const server = new ApolloServer({
  typeDefs: loadSchema(),
  resolvers,
  context: createContext(),
  csrfPrevention: true,
  cache: 'bounded'
})

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})

function loadSchema(): DocumentNode {
  return gql(readFileSync(`${__dirname}/schema.graphql`, { encoding: 'utf-8' }))
}
