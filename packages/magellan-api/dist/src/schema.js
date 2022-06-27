"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const apollo_server_1 = require("apollo-server");
exports.schema = (0, apollo_server_1.gql) `
  type Query {
    searchTables(input: SearchForTablesInput!): SearchTablesOutput!
    getTableByName(input: GetTableByNameInput!): GetTableByNameOutput!
  }

  input SearchForTablesInput {
    searchText: String!
  }

  type SearchTablesOutput {
    tables: [Table!]!
  }

  input GetTableByNameInput {
    databaseName: String!
    tableName: String!
  }

  type GetTableByNameOutput {
    table: Table
  }

  type Table {
    name: String!
    databaseName: String!
    description: String!
    location: String!
    owner: String
    columns: [Column!]!
  }

  type Column {
    name: String!
    type: String!
    description: String
  }
`;
