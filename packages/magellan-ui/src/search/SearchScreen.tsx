import { gql } from '@apollo/client'
import { Box } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSearchTablesLazyQuery } from '../generated/graphql'
import { SearchBar } from './SearchBar'
import { SearchResults } from './SearchResults'

const query = gql`
  query SearchTables($input: SearchTablesInput!) {
    searchTables(input: $input) {
      tables {
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

export function SearchScreen() {
  const navigate = useNavigate()
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [searchTables, { data, loading, error }] = useSearchTablesLazyQuery()

  const { tables = [] } = data?.searchTables ?? {}
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 0,
          justifyContent: 'center'
        }}
      >
        <SearchBar
          loading={loading}
          onChange={(value) => {
            if (value.length > 3) {
              searchTables({ variables: { input: { searchText: value } } })
              setShowSearchResults(true)
            }
          }}
          onClear={() => {
            setShowSearchResults(false)
          }}
        />

        {showSearchResults && !loading && data && (
          <SearchResults
            tables={tables}
            onClick={(table) =>
              navigate(`/databases/${table.databaseName}/tables/${table.name}`)
            }
          />
        )}
      </Box>
    </>
  )
}
