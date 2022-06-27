import CloseIcon from '@mui/icons-material/Close'
import SearchIcon from '@mui/icons-material/Search'
import {
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField
} from '@mui/material'
import { useState } from 'react'

export interface SearchBarProps {
  onChange: (value: string) => void
  onClear: () => void
  loading?: boolean
}

export function SearchBar(props: SearchBarProps) {
  const [searchText, setSearchText] = useState('')
  const { onChange, onClear, loading } = props
  return (
    <TextField
      placeholder="Find tables by name, column or tag"
      value={searchText}
      autoComplete="off"
      InputProps={{
        sx: { borderRadius: '30px' },
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),

        endAdornment: (
          <InputAdornment position="start">
            {loading && <CircularProgress size={24} />}
            {!loading && searchText.length > 0 && (
              <IconButton
                onClick={() => {
                  setSearchText('')
                  if (onClear) {
                    onClear()
                  }
                }}
              >
                <CloseIcon />
              </IconButton>
            )}
          </InputAdornment>
        )
      }}
      onChange={(e) => {
        const value = (e.target as HTMLInputElement).value
        setSearchText(value)
        onChange(value)
      }}
    />
  )
}
