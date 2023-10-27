import React from 'react'
import { styled } from '@mui/material/styles'
import TaskDataListStore from 'store/TaskDataListStore'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import TaskData from 'interface/TaskData'


const TableDataCell = styled(TableCell)({
  color: '#13243A',
  fontSize: '13px',
  fontFamily: 'Pretendard',
  fontWeight: 400,
  textAlign: 'center',
})


const TableDataLastCell = styled(TableDataCell)({
  borderBottom: 'none',
})


const TableDataBody = () => {
  const taskDataList: TaskData[] = TaskDataListStore(state => state.taskDataList)

  return (
    <TableBody>
      {taskDataList.map((taskData, index) => {
        if(index === taskDataList.length - 1) {
          return (
            <TableRow key={taskData.LOTNo}>
              <TableDataLastCell align='center'>{(index + 1).toString().padStart(2, '0')}</TableDataLastCell>
              <TableDataLastCell align='center'>{taskData.workDate.format('YYYY-MM-DD')}</TableDataLastCell>
              <TableDataLastCell align='center'>{taskData.LOTNo}</TableDataLastCell>
              <TableDataLastCell align='center'>{taskData.variety}</TableDataLastCell>
              <TableDataLastCell align='center'>{taskData.standard}</TableDataLastCell>
              <TableDataLastCell align='center'>{taskData.length}</TableDataLastCell>
              <TableDataLastCell align='center'>{taskData.weight}</TableDataLastCell>
            </TableRow>
          )
        }
        return (
          <TableRow key={taskData.LOTNo}>
            <TableDataCell align='center'>{(index + 1).toString().padStart(2, '0')}</TableDataCell>
            <TableDataCell align='center'>{taskData.workDate.format('YYYY-MM-DD')}</TableDataCell>
            <TableDataCell align='center'>{taskData.LOTNo}</TableDataCell>
            <TableDataCell align='center'>{taskData.variety}</TableDataCell>
            <TableDataCell align='center'>{taskData.standard}</TableDataCell>
            <TableDataCell align='center'>{taskData.length}</TableDataCell>
            <TableDataCell align='center'>{taskData.weight}</TableDataCell>
          </TableRow>
        )
      })}
    </TableBody>
  )
}

export default TableDataBody
