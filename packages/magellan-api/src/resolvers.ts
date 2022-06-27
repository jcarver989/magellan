import { Context } from './createContext'
import {
  GetDatabasesOutput,
  GetTableByNameOutput,
  GetTablesByDatabaseNameOutput,
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

    async getTablesByDatabaseName(
      _,
      { input },
      { metastoreClient }
    ): Promise<GetTablesByDatabaseNameOutput> {
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

    async getTableByName(
      _,
      { input },
      { metastoreClient }
    ): Promise<GetTableByNameOutput> {
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
