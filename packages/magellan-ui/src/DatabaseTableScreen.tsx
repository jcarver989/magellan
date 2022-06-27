import { gql } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { DatabaseTableDetails } from './DatabaseTableDetails'
import { useGetTableDetailsQuery } from './generated/graphql'
import { Loading } from './Loading'

const query = gql`
  query GetTableDetails($input: GetTableByNameInput!) {
    getTableByName(input: $input) {
      table {
        name
        databaseName
        description
        location
        owner
        properties {
          name
          value
        }
        columns {
          name
          description
          type
        }
      }
    }
  }
`

export function DatabaseTableScreen() {
  const { databaseName = '', tableName = '' } = useParams()
  const { data, loading, error } = useGetTableDetailsQuery({
    variables: { input: { databaseName, tableName } }
  })

  if (loading) {
    return <Loading />
  }

  const table = data?.getTableByName.table
  if (table) {
    return <DatabaseTableDetails table={table} />
  } else {
    return <h1>Error</h1>
  }
}
