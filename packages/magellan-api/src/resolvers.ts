import { Context } from './createContext'
import {
  GetDatabasesOutput,
  GetTableOutput,
  GetTablesOutput,
  Resolvers,
  SearchTablesOutput
} from './generated/graphql'

export const resolvers: Resolvers<Context> = {
  Query: {
    async getDatabases(
      _,
      __,
      { metastoreClient }
    ): Promise<GetDatabasesOutput> {
      const databases = await metastoreClient.getDatabases()
      return { databases }
    },

    async getTables(
      _,
      { input },
      { metastoreClient }
    ): Promise<GetTablesOutput> {
      const tables = await metastoreClient.getTablesByDatabaseName(
        input.databaseName
      )
      return { tables }
    },

    async searchTables(
      _,
      { input },
      { metastoreClient }
    ): Promise<SearchTablesOutput> {
      const tables = await metastoreClient.searchTables(input.searchText)
      return {
        tables
      }
    },

    async getTable(_, { input }, { metastoreClient }): Promise<GetTableOutput> {
      const table = await metastoreClient.getTableByName(
        input.databaseName,
        input.tableName
      )

      if (table) {
        return { table }
      } else {
        return {}
      }
    }
  }
}
