import DatabaseIcon from '@mui/icons-material/ViewList'
import {
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import { Fragment } from 'react'
import { Table as GqlTable } from '../generated/graphql'

export interface SearchResultsProps {
  tables: GqlTable[]
  onClick: (table: GqlTable) => void
}

export function SearchResults(props: SearchResultsProps) {
  const { tables, onClick } = props

  if (tables.length === 0) {
    return null
  }

  return (
    <List>
      {tables.map((t, i) => {
        const { properties = [], description } = t
        const showDivider = i !== tables.length - 1
        const comment =
          description ??
          properties.find((_) => _.name === 'comment')?.value ??
          'n/a'

        return (
          <Fragment key={t.name}>
            <ListItemButton onClick={() => onClick(t)}>
              <ListItemText
                primary={`${t.databaseName}.${t.name}`}
                secondary={comment}
                primaryTypographyProps={{
                  fontWeight: 'bold'
                }}
              />
            </ListItemButton>
            {showDivider && <Divider />}
          </Fragment>
        )
      })}
    </List>
  )
}
