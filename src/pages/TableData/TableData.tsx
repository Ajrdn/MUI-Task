import React from 'react'
import dayjs from 'dayjs'
import TableDataCopyStore from 'store/TableDataCopyStore'
import TableSearchStore from 'store/TableSearchStore'
import TaskDataListStore from 'store/TaskDataListStore'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import Box from '@mui/material/Box'
import { useSnackbar } from 'notistack'
import TableHeader from './TableDataHeader'
import TableDataBody from './TableDataBody'
import { TaskDataClient, TaskDataServer } from 'interface/TaskData'


function TableData() {
  const { enqueueSnackbar } = useSnackbar()

  const {
    tableTaskDataRowCopyListLength,
    tableTaskDataRowPasteList,
    clearTableTaskDataRowCopyList,
    setTableTaskDataRowPasteList,
  } = TableDataCopyStore()

  const searchDate = TableSearchStore(state => state.searchDate)

  const setTaskDataDateList = TaskDataListStore(state => state.setTaskDataDateList)

  const snackbarOptions = {
    variant: '',
    autoHideDuration: 3000,
    disableWindowBlurListener: true,
  }

  const copyData = (event: React.KeyboardEvent) => {
    if(event.ctrlKey && event.key === 'c') {
      if(tableTaskDataRowCopyListLength > 0) {
        enqueueSnackbar('성공적으로 복사되었습니다!', {
          ...snackbarOptions,
          variant: 'success',
        })
      } else {
        enqueueSnackbar('복사할 데이터가 선택되지 않았습니다.', {
          ...snackbarOptions,
          variant: 'warning',
        })
      }
      setTableTaskDataRowPasteList()
    } else if(event.ctrlKey && event.key === 'v') {
      if(tableTaskDataRowPasteList.length > 0) {
        const TaskDataServerList: TaskDataServer[] = tableTaskDataRowPasteList.map(taskDataServer => {
          return {
            ...taskDataServer,
            workDate: searchDate.format('YYYY-MM-DD')
          }
        })
        fetch(`http://localhost:8000/taskDataList/${searchDate.format('YYYY-MM-DD')}`, {
          method: 'PUT',
          body: JSON.stringify(TaskDataServerList),
          headers: {
            'Content-Type': 'application/json',
          },
        })
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
          enqueueSnackbar('성공적으로 붙여넣었습니다!', {
            ...snackbarOptions,
            variant: 'success',
          })
        })
      } else {
        enqueueSnackbar('붙여넣기할 데이터가 선택되지 않았습니다.', {
          ...snackbarOptions,
          variant: 'warning',
        })
      }
    }
  }

  return (
    <TableContainer
      component={Box}
      sx={{
        border: '1px solid #C8C8C8',
        borderRadius: '8px',
      }}
      onKeyUp={copyData}
      tabIndex={0}
      onBlur={clearTableTaskDataRowCopyList}
    >
      <Table>
        <TableHeader />
        <TableDataBody />
      </Table>
    </TableContainer>
  )
}

export default TableData
