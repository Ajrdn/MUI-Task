import React from 'react'
import TaskDataListStore from 'store/TaskDataListStore'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'


const TableDataHeader = () => {
  const taskDataTitleList: string[] = TaskDataListStore(state => state.taskDataTitleList)

  return (
    <TableHead>
      <TableRow>
        {taskDataTitleList.map(title => (
          <TableCell
            key={title}
            align='center'
          >
            {title}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export default TableDataHeader
