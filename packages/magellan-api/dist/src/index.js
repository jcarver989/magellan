"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const fs_1 = require("fs");
const createContext_1 = require("./createContext");
const resolvers_1 = require("./resolvers");
process.env.AWS_PROFILE = 'Okta_Ginger_Dev_Admin';
process.env.AWS_REGION = 'us-west-2';
const server = new apollo_server_1.ApolloServer({
    typeDefs: loadSchema(),
    resolvers: resolvers_1.resolvers,
    context: (0, createContext_1.createContext)(),
    csrfPrevention: true,
    cache: 'bounded'
});
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
function loadSchema() {
    return (0, apollo_server_1.gql)((0, fs_1.readFileSync)(`${__dirname}/schema.graphql`, { encoding: 'utf-8' }));
}
