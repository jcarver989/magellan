import { gql } from '@apollo/client'
import {
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Paper
} from '@mui/material'
import { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import { useListDatabasesQuery } from './generated/graphql'
import { Loading } from './Loading'

const query = gql`
  query ListDatabases {
    getDatabases {
      databases {
        name
        description
      }
    }
  }
`

export function DatabasesScreen() {
  const navigate = useNavigate()
  const { data, loading, error } = useListDatabasesQuery()
  const dbs = data?.getDatabases.databases ?? []

  if (loading) {
    return <Loading />
  }

  return (
    <>
      <h1>Databases</h1>
      <Paper>
        <List>
          {dbs.map((db, i) => {
            const { description } = db
            const comment = description ?? ''
            const showDivider = i !== dbs.length - 1
            return (
              <Fragment key={db.name}>
                <ListItemButton
                  onClick={() => navigate(`/databases/${db.name}`)}
                >
                  <ListItemText
                    primary={db.name}
                    primaryTypographyProps={{ fontWeight: 'bold' }}
                    secondary={comment}
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
