import { gql } from '@apollo/client'
import {
  Breadcrumbs,
  Divider,
  Link,
  List,
  ListItemButton,
  ListItemText,
  Paper
} from '@mui/material'
import { Fragment } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetDatabaseTablesScreenQuery } from './generated/graphql'
import { Loading } from './Loading'

const query = gql`
  query GetDatabaseTablesScreen($input: GetTablesInput!) {
    getTables(input: $input) {
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

  const { tables = [] } = data?.getTables ?? {}
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
          {tables.map((t, i) => {
            const { description } = t
            const showDivider = i !== tables.length - 1

            return (
              <Fragment key={t.name}>
                <ListItemButton
                  onClick={() =>
                    navigate(`/databases/${databaseName}/tables/${t.name}`)
                  }
                >
                  <ListItemText
                    primary={`${t.name}`}
                    primaryTypographyProps={{ fontWeight: 'bold' }}
                    secondary={description}
                  />
                </ListItemButton>
                {showDivider && <Divider />}
              </Fragment>
            )
          })}
        </List>
      </Paper>
    </>
  )
}
