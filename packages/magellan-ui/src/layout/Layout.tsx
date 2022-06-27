import Box from '@mui/material/Box'
import { Outlet } from 'react-router-dom'
import { LeftNav } from './LeftNav'

export function Layout() {
  return (
    <Box sx={{ display: 'flex' }}>
      <LeftNav />
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Outlet />
      </Box>
    </Box>
  )
}
