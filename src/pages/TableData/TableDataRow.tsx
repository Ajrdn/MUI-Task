import TableDataCopyStore from 'store/TableDataCopyStore'
import { styled } from '@mui/material/styles'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableTaskDataRow from 'interface/TableTaskDataRow'


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
  cellDataList: string[]
  taskDataRow: TableTaskDataRow
}


function TableDataRow(props: TableDataRowProps) {
  const selectTableTaskDataRowCopyList = TableDataCopyStore(state => state.clickTableTaskDataRow)

  const CopySelected = () => {
    selectTableTaskDataRowCopyList(props.taskDataRow.index)
  }

  return (
    <TableRow
      onClick={CopySelected}
      sx={{
        '&:last-child > *': {
          borderBottom: 'none',
        },
      }}
    >
      {props.cellDataList.map(cellData => (
        <TableDataCell
          key={cellData}
          align='center'
          selected={props.taskDataRow.selected}
        >
          {cellData}
        </TableDataCell>
      ))}
    </TableRow>
  )
}

export default TableDataRow
