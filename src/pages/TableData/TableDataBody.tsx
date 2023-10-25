import React from 'react'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import TaskData from 'interface/TaskData'


interface TableDataBodyProps {
  taskDataList: TaskData[]
}


const TableDataBody = (props: TableDataBodyProps) => {
  return (
    <TableBody>
      {props.taskDataList.map((taskData, index) => (
        <TableRow key={taskData.LOTNo}>
          <TableCell align='center'>{(index + 1).toString().padStart(2, '0')}</TableCell>
          <TableCell align='center'>{taskData.workDate}</TableCell>
          <TableCell align='center'>{taskData.LOTNo}</TableCell>
          <TableCell align='center'>{taskData.variety}</TableCell>
          <TableCell align='center'>{taskData.standard}</TableCell>
          <TableCell align='center'>{taskData.length}</TableCell>
          <TableCell align='center'>{taskData.weight}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  )
}

export default TableDataBody
