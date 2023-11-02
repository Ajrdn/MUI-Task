import React from 'react'
import TableDataCopyStore from 'store/TableDataCopyStore'
import TableSearchStore from 'store/TableSearchStore'
import TaskDataListStore from 'store/TaskDataListStore'
import TableHeaderFilterStore from 'store/TableHeaderFilterStore'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import Box from '@mui/material/Box'
import { useSnackbar } from 'notistack'
import TableDataHeader from './TableDataHeader'
import TableDataBody from './TableDataBody'
import TaskData from 'interface/TaskData'
import TableHeader from 'interface/TableHeader'


function TableData() {
  const tableHeaderFilterStore = TableHeaderFilterStore()

  const tableHeaderList: TableHeader[] = [
    {
      title: 'No.',
      size: '64px',
    },
    {
      title: '작업일',
      size: '128px',
    },
    {
      title: 'LOT No.',
      size: '300px',
      filterData: tableHeaderFilterStore.lotNo,
      filterFunction: tableHeaderFilterStore.setLotNo,
    },
    {
      title: '품종',
      size: '300px',
      filterData: tableHeaderFilterStore.variety,
      filterFunction: tableHeaderFilterStore.setVariety,
    },
    {
      title: '규격',
      size: '300px',
      filterData: tableHeaderFilterStore.standard,
      filterFunction: tableHeaderFilterStore.setStandard,
    },
    {
      title: '슬라브 길이',
      size: '300px',
      filterData: tableHeaderFilterStore.length,
      filterFunction: tableHeaderFilterStore.setLength,
    },
    {
      title: '중량',
      size: '128px',
      filterData: tableHeaderFilterStore.weight,
      filterFunction: tableHeaderFilterStore.setWeight,
    },
  ];

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
        const TaskDataList: TaskData[] = tableTaskDataRowPasteList.map(taskData => {
          return {
            ...taskData,
            workDate: searchDate.format('YYYY-MM-DD')
          }
        })
        fetch(`http://localhost:8000/taskDataList/${searchDate.format('YYYY-MM-DD')}`, {
          method: 'PUT',
          body: JSON.stringify(TaskDataList),
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(response => response.json())
        .then((taskDataDateList: TaskData[]) => {
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
        <TableDataHeader tableHeaderList={tableHeaderList} />
        <TableDataBody />
      </Table>
    </TableContainer>
  )
}

export default TableData
