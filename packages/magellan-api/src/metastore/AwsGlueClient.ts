import {
  GetDatabasesCommand,
  GetTableCommand,
  GetTablesCommand,
  GlueClient,
  SearchTablesCommand,
  Table as GlueTable
} from '@aws-sdk/client-glue'
import { inspect } from 'util'
import { Database, Table } from '../generated/graphql'
import { MetastoreClient } from './MetastoreClient'

/** A metastore client backed by AWS Glue Data Catalog */
export class AwsGlueClient implements MetastoreClient {
  constructor(private glueClient: GlueClient = new GlueClient({})) {}

  async getDatabases(): Promise<Database[]> {
    const query = new GetDatabasesCommand({
      MaxResults: 100 // max
    })

    const { DatabaseList = [] } = await this.glueClient.send(query)
    return DatabaseList.map((db) => ({
      name: db.Name!,
      description: db.Description!,
      tables: []
    }))
  }

  async getTablesByDatabaseName(databaseName: string): Promise<Table[]> {
    const query = new GetTablesCommand({
      DatabaseName: databaseName,
      MaxResults: 100
    })

    const { TableList = [] } = await this.glueClient.send(query)
    return TableList.map((t) => this.toTable(t))
  }

  async searchTables(searchText: string): Promise<Table[]> {
    const query = new SearchTablesCommand({
      MaxResults: 1000, // max
      SearchText: searchText
    })

    const { TableList = [] } = await this.glueClient.send(query)
    console.log(
      inspect(TableList, { colors: true, depth: null, showHidden: false })
    )
    return TableList.map((t) => this.toTable(t))
  }

  async getTableByName(
    databaseName: string,
    tableName: string
  ): Promise<Table | void> {
    const query = new GetTableCommand({
      DatabaseName: databaseName,
      Name: tableName
    })

    const { Table } = await this.glueClient.send(query)
    if (Table) {
      return this.toTable(Table)
    }
  }

  private toTable(table: GlueTable): Table {
    const { Parameters = {} } = table
    const { Columns = [], Location } = table.StorageDescriptor ?? {}
    const properties = Object.entries(Parameters).map(([name, value]) => ({
      name,
      value
    }))

    return {
      name: table.Name!,
      databaseName: table.DatabaseName!,
      description: table.Description!,
      location: Location!,
      properties,
      columns: Columns.map((c) => {
        return {
          name: c.Name!,
          type: c.Type!,
          description: c.Comment
        }
      })
    }
  }
}
