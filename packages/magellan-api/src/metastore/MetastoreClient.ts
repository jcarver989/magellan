import { Database, Table } from '../generated/graphql'

/** A MetastoreClient is backed by an external store, such as AWS Glue Data Catalog
 *  and provides a mechanism for this graphQL API to query/search for database and table metadata
 */
export interface MetastoreClient {
  getDatabases(): Promise<Database[]>

  getTablesByDatabaseName(databaseName: string): Promise<Table[]>
  searchTables(searchText: string): Promise<Table[]>
  getTableByName(databaseName: string, tableName: string): Promise<Table | void>
}
