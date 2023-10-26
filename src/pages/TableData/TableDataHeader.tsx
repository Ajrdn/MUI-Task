import React from 'react'
import TaskDataListStore from 'store/TaskDataListStore'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableHeader from 'interface/TableHeader'


const TableDataHeader = () => {
  const taskDataTitleList: TableHeader[] = TaskDataListStore(state => state.taskDataTitleList)

  return (
    <TableHead>
      <TableRow>
        {taskDataTitleList.map(tableHeader => (
          <TableCell
            key={tableHeader.title}
            align='center'
            sx={{
              width: tableHeader.size
            }}
          >
            {tableHeader.title}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export default TableDataHeader
