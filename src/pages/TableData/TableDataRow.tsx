import React, { useState } from 'react'
import TableDataCopyStore from 'store/TableDataCopyStore'
import { styled } from '@mui/material/styles'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TaskDataRow from 'interface/TaskDataRow'


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
  taskDataRow: TaskDataRow
}


function TableDataRow(props: TableDataRowProps) {
  const [selected, setSelected] = useState<boolean>(false)

  const addTaskDataRowCopyList = TableDataCopyStore(state => state.addTaskDataRowCopyList)
  const deleteTaskDataRowCopyList = TableDataCopyStore(state => state.deleteTaskDataRowCopyList)

  const CopySelected = () => {
    if(!selected) addTaskDataRowCopyList(props.taskDataRow)
    else deleteTaskDataRowCopyList(props.taskDataRow.index)
    setSelected(prev => !prev)
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
          selected={selected}
        >
          {cellData}
        </TableDataCell>
      ))}
    </TableRow>
  )
}

export default TableDataRow
