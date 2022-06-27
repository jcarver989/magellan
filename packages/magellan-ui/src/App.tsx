import { ThemeProvider } from '@emotion/react'
import { createTheme } from '@mui/material/styles'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import { DatabasesScreen } from './DatabasesScreen'
import { Layout } from './layout/Layout'
import { SearchScreen } from './search/SearchScreen'
import { DatabaseTableScreen } from './DatabaseTableScreen'
import { DatabaseTablesScreen } from './DatabaseTablesScreen'

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(34,78,245)'
    }
  },
  typography: {
    fontFamily: 'HkGrotesk'
  }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<SearchScreen />} />
            <Route path="/search" element={<SearchScreen />} />

            <Route path="/databases" element={<Outlet />}>
              <Route path="" element={<DatabasesScreen />}></Route>
              <Route path=":databaseName" element={<DatabaseTablesScreen />} />
              <Route
                path=":databaseName/tables/:tableName"
                element={<DatabaseTableScreen />}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

function Screen() {}

export default App
