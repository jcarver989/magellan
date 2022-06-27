import { gql } from '@apollo/client'
import DatabaseIcon from '@mui/icons-material/ViewList'
import {
  Breadcrumbs,
  Link,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper
} from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetDatabaseTablesScreenQuery } from './generated/graphql'
import { Loading } from './Loading'

const query = gql`
  query GetDatabaseTablesScreen($input: GetTablesByDatabaseNameInput!) {
    getTablesByDatabaseName(input: $input) {
      tables {
        name
        description
        location
        properties {
          name
          value
        }
      }
    }
  }
`

export function DatabaseTablesScreen() {
  const { databaseName = '' } = useParams()
  const navigate = useNavigate()
  const { data, loading, error } = useGetDatabaseTablesScreenQuery({
    variables: { input: { databaseName } }
  })

  if (loading) {
    return <Loading />
  }

  const { tables = [] } = data?.getTablesByDatabaseName ?? {}

  return (
    <>
      <Breadcrumbs>
        <Link underline="hover" href="/databases">
          databases
        </Link>
        <Link underline="hover" color="text.primary">
          {databaseName}
        </Link>
      </Breadcrumbs>

      <h1>{databaseName} database</h1>
      <h2>Tables</h2>
      <Paper>
        <List>
          {tables.map((t) => {
            const { properties = [], description } = t
            const comment =
              description ??
              properties.find((_) => _.name === 'comment')?.value ??
              ''

            return (
              <ListItemButton
                key={t.name}
                onClick={() =>
                  navigate(`/databases/${databaseName}/tables/${t.name}`)
                }
              >
                <ListItemIcon>
                  <DatabaseIcon />
                </ListItemIcon>
                <ListItemText primary={`${t.name}`} secondary={comment} />
              </ListItemButton>
            )
          })}
        </List>
      </Paper>
    </>
  )
}
