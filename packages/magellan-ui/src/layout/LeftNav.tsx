import { ThemeProvider } from '@emotion/react'
import SailingIcon from '@mui/icons-material/Sailing'
import SelectedSearchIcon from '@mui/icons-material/SavedSearch'
import SearchIcon from '@mui/icons-material/Search'
import DatabaseIcon from '@mui/icons-material/Storage'
import { Box, createTheme, ListItemText } from '@mui/material'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import { ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const drawerWidth = 220

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#224ef5'
    },
    action: {
      selectedOpacity: 0.8
    },
    background: {
      paper: '#060725'
    }
  }
})

export function LeftNav() {
  return (
    <ThemeProvider theme={theme}>
      <Drawer
        sx={{
          width: drawerWidth,
          textAlign: 'center',
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box'
          }
        }}
        variant="permanent"
        anchor="left"
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <SailingIcon sx={{ marginRight: '10px' }} />
          <h2 style={{ fontWeight: 'bold' }}>Magellan</h2>
        </Box>

        <nav aria-label="main">
          <List>
            <NavButton
              path="/search"
              text="Search"
              icon={<SearchIcon />}
              selectedIcon={<SelectedSearchIcon />}
            />
            <NavButton
              path="/databases"
              text="Databases"
              icon={<DatabaseIcon />}
            />
          </List>
        </nav>
      </Drawer>
    </ThemeProvider>
  )
}

function NavButton(props: {
  text: string
  icon: ReactNode
  selectedIcon?: ReactNode
  path: string
}) {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { text, path } = props
  const isSelected = pathname.startsWith(path)
  const icon =
    isSelected && props.selectedIcon ? props.selectedIcon : props.icon
  return (
    <ListItem disablePadding>
      <ListItemButton selected={isSelected} onClick={() => navigate(path)}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText
          primary={text}
          primaryTypographyProps={{ fontWeight: 600 }}
        />
      </ListItemButton>
    </ListItem>
  )
}
