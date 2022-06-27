import {
  Breadcrumbs,
  Chip,
  Divider,
  Link,
  List,
  ListItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
import { Table as GqlTable } from './generated/graphql'

export function DatabaseTableDetails(props: { table: GqlTable }) {
  const { table } = props
  const columns = table.columns.map((c) => {
    return (
      <TableRow key={c.name}>
        <TableCell>{c.name}</TableCell>
        <TableCell>{c.type}</TableCell>
        <TableCell>{c.description}</TableCell>
      </TableRow>
    )
  })

  return (
    <>
      <Breadcrumbs>
        <Link underline="hover" href="/databases">
          databases
        </Link>
        <Link underline="hover" href={`/databases/${table.databaseName}`}>
          {table.databaseName}
        </Link>
        <Link underline="hover" color="text.primary">
          {table.name}
        </Link>
      </Breadcrumbs>

      <h1>{table.name} table</h1>
      <p>{table.description}</p>

      <h2>Metadata</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Owner</TableCell>
              <TableCell>{table.owner ?? 'unknown'}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Location</TableCell>
              <TableCell>{table.location ?? 'unknown'}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Properties</TableCell>
              <TableCell>
                <List>
                  {table.properties.map((p) => (
                    <ListItem key={p.name}>
                      <Chip
                        label={`${p.name} : ${p.value.slice(0, 120)}`}
                      ></Chip>
                    </ListItem>
                  ))}
                </List>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <h2>Schema</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{columns}</TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
