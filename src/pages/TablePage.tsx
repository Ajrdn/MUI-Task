import React, { useEffect }  from 'react'
import dayjs, { Dayjs } from 'dayjs'
import TableSearchStore from 'store/TableSearchStore'
import TaskDataListStore from 'store/TaskDataListStore'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import TablePageSearchBar from './TablePageSearchBar/TablePageSearchBar'
import TableData from './TableData/TableData'
import TableAddFab from './TableAddFab/TableAddFab'
import AlarmFab from 'components/AlarmFab/AlarmFab'
import InformFab from 'components/InformFab/InformFab'
import { TaskDataClient, TaskDataServer } from 'interface/TaskData'


const TablePageBackground = styled(Box)({
  width: '1520px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
})


function TablePage() {
  const date: Dayjs = TableSearchStore(state => state.searchDate)
  const setTaskDataDateList = TaskDataListStore(state => state.setTaskDataDateList)
  const setTaskDataShowList = TaskDataListStore(state => state.setTaskDataShowList)

  useEffect(() => {
    fetch(`http://localhost:8000/taskDataList/${date.format('YYYY-MM-DD')}`)
    .then(response => response.json())
    .then((data: TaskDataServer[]) => {
      const taskDataDateList: TaskDataClient[] = data.map(taskData => ({
        workDate: dayjs(taskData.workDate),
        lotNo: taskData.lotNo,
        variety: taskData.variety,
        standard: taskData.standard,
        length: taskData.length,
        weight: taskData.weight,
      }))

      setTaskDataDateList(taskDataDateList)
      setTaskDataShowList(taskDataDateList)
    })
  }, [date, setTaskDataDateList, setTaskDataShowList])

  return (
    <>
      <TablePageBackground>
        <TablePageSearchBar />
        <TableData />
      </TablePageBackground>
      <TableAddFab />
      <InformFab />
      <AlarmFab />
    </>
  )
}

export default TablePage
