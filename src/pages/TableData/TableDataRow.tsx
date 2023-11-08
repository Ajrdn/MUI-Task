import { styled } from '@mui/material/styles'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import CopyAll from '@mui/icons-material/CopyAll'
import DeleteOutline from '@mui/icons-material/DeleteOutline'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import TableRowData from 'interface/TableRowData'


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


interface TableDataRowProps<TableDataType> {
  tableRowData: TableRowData<TableDataType>
  clickTableRow: (index: number) => void
  setTableDataDateList: (newTableDataDateList: TableDataType[]) => void
  copy?: boolean
  modify?: boolean
  delete?: boolean
}


function TableDataRow<TableDataType>(props: TableDataRowProps<TableDataType>) {
  const rowSelected = () => {
    props.clickTableRow(props.tableRowData.index)
  }

  const copyFunction = () => {
    
  }

  const modifyFunction = () => {

  }

  const deleteFunction = () => {

  }

  return (
    <TableRow
      sx={{
        '&:last-child > *': {
          borderBottom: 'none',
        },
      }}
    >
      {props.tableRowData.tableRowStringData.map((cellData, index) => (
        <TableDataCell
          key={`${cellData}${index}`}
          align='center'
          selected={props.tableRowData.selected}
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
          <IconButton onClick={copyFunction}>
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
          <Button
            variant='text'
            onClick={modifyFunction}
          >
            수정
          </Button>
        </TableFunctionCell>
        }
        {props.delete &&
        <TableFunctionCell
          align='center'
          sx={{
            width: '64px',
          }}
        >
          <IconButton onClick={deleteFunction}>
            <DeleteOutline />
          </IconButton>
        </TableFunctionCell>
        }
    </TableRow>
  )
}

export default TableDataRow
