import { styled } from '@mui/material/styles'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import CopyAll from '@mui/icons-material/CopyAll'
import DeleteOutline from '@mui/icons-material/DeleteOutline'
import { Button, IconButton } from '@mui/material'


interface TableDataCellProps {
  selected: boolean
}


const TableDataCell = styled(TableCell)<TableDataCellProps>(({ selected }) => ({
  color: '#13243A',
  fontSize: '13px',
  fontFamily: 'Pretendard',
  fontWeight: 400,
  backgroundColor: selected ? '#E8E8E8' : 'white',
}))


const TableFunctionCell = styled(TableCell)({
  '& button': {
    color: '#0F3D7A',
    fontSize: '15px',
    fontFamily: 'Pretendard',
    fontWeight: 500,
  },
})


interface TableDataRowProps {
  tableRowData: string[]
  index: number
  selected: boolean
  clickTableRow: (index: number) => void
  copy?: boolean
  modify?: boolean
  delete?: boolean
}


function TableDataRow(props: TableDataRowProps) {
  const rowSelected = () => {
    props.clickTableRow(props.index)
  }

  return (
    <TableRow
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
          onClick={rowSelected}
          >
          {cellData}
        </TableDataCell>
      ))}
      {props.copy &&
        <TableFunctionCell
          align='center'
          sx={{
            width: '64px',
          }}
        >
          <IconButton>
            <CopyAll />
          </IconButton>
        </TableFunctionCell>
        }
        {props.modify &&
        <TableFunctionCell
          align='center'
          sx={{
            width: '64px',
          }}
        >
          <Button variant='text'>수정</Button>
        </TableFunctionCell>
        }
        {props.delete &&
        <TableFunctionCell
          align='center'
          sx={{
            width: '64px',
          }}
        >
          <IconButton>
            <DeleteOutline />
          </IconButton>
        </TableFunctionCell>
        }
    </TableRow>
  )
}

export default TableDataRow
