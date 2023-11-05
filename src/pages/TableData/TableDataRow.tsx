import { styled } from '@mui/material/styles'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'


interface TableDataCellProps {
  selected: boolean
}


const TableDataCell = styled(TableCell)<TableDataCellProps>(({ selected }) => ({
  color: '#13243A',
  fontSize: '13px',
  fontFamily: 'Pretendard',
  fontWeight: 400,
  textAlign: 'center',
  backgroundColor: selected ? '#E8E8E8' : 'white',
}))


interface TableDataRowProps {
  tableRowData: string[]
  index: number
  selected: boolean
  clickTableRow: (index: number) => void
}


function TableDataRow(props: TableDataRowProps) {
  const rowSelected = () => {
    props.clickTableRow(props.index)
  }

  return (
    <TableRow
      onClick={rowSelected}
      sx={{
        '&:last-child > *': {
          borderBottom: 'none',
        },
      }}
    >
      {props.tableRowData.map((cellData, index) => (
        <TableDataCell
          key={`${cellData}${index}`}
          align='center'
          selected={props.selected}
        >
          {cellData}
        </TableDataCell>
      ))}
    </TableRow>
  )
}

export default TableDataRow
