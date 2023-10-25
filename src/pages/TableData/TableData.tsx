import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import Box from '@mui/material/Box'
import TableHeader from './TableDataHeader'
import TableDataBody from './TableDataBody'


const TableData = () => {
  return (
    <TableContainer
      component={Box}
      sx={{
        border: '1px solid #C8C8C8',
        borderRadius: '8px',
      }}
    >
      <Table>
        <TableHeader />
        <TableDataBody />
      </Table>
    </TableContainer>
  )
}

export default TableData
