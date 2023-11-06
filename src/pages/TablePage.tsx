import React, { useEffect }  from 'react'
import { Dayjs } from 'dayjs'
import TableSearchStore from 'store/TableSearchStore'
import TaskDataListStore from 'store/TaskDataListStore'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import TableHeader from 'interface/TableHeader'
import TaskData from 'interface/TaskData'
import TablePageSearchBar from './TablePageSearchBar/TablePageSearchBar'
import TableData from './TableData/TableData'
import TableAddFab from './TableAddFab/TableAddFab'
import AlarmFab from 'components/AlarmFab/AlarmFab'


const TablePageBackground = styled(Box)({
  width: '1520px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
})


function TablePage() {
  const date: Dayjs = TableSearchStore(state => state.searchDate)
  const {
    taskDataShowList,
    selectTaskDataShowListLength,
    taskDataPasteList,
    taskDataPasteListLength,
    lotNo,
    variety,
    standard,
    length,
    weight, 
    setTaskDataDateList,
    setTaskDataShowList,
    setTaskDataShowListByFilter,
    clickTableRow,
    clearTaskDataShowList,
    setTaskDataPasteList,
    setLotNo,
    setVariety,
    setStandard,
    setLength,
    setWeight,
  } = TaskDataListStore()

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
      filterData: lotNo,
      setFilterData: setLotNo,
    },
    {
      title: '품종',
      size: '300px',
      filterData: variety,
      setFilterData: setVariety,
    },
    {
      title: '규격',
      size: '300px',
      filterData: standard,
      setFilterData: setStandard,
    },
    {
      title: '슬라브 길이',
      size: '300px',
      filterData: length,
      setFilterData: setLength,
    },
    {
      title: '중량',
      size: '128px',
      filterData: weight,
      setFilterData: setWeight,
    },
  ]

  const pasteFunction = (): Promise<void> => {
    const TaskDataList: TaskData[] = taskDataPasteList.map(taskData => {
      return {
        ...taskData,
        workDate: date.format('YYYY-MM-DD')
      }
    })
    return fetch(`http://localhost:8000/taskDataList/${date.format('YYYY-MM-DD')}`, {
      method: 'PUT',
      body: JSON.stringify(TaskDataList),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then((taskDataDateList: TaskData[]) => {
      setTaskDataDateList(taskDataDateList)
    })
  }

  useEffect(() => {
    fetch(`http://localhost:8000/taskDataList/${date.format('YYYY-MM-DD')}`)
    .then(response => response.json())
    .then((taskDataDateList: TaskData[]) => {
      setTaskDataDateList(taskDataDateList)
    })
  }, [date, setTaskDataDateList, setTaskDataShowList])

  return (
    <>
      <TablePageBackground>
        <TablePageSearchBar />
        <TableData<TaskData>
          tableHeaderList={tableHeaderList}
          pasteFunction={pasteFunction}
          tableDataShowList={taskDataShowList}
          selectTableDataShowListLength={selectTaskDataShowListLength}
          tableDataPasteListLength={taskDataPasteListLength}
          clickTableRow={clickTableRow}
          clearTableDataShowList={clearTaskDataShowList}
          setTableDataPasteList={setTaskDataPasteList}
          filterFunction={setTaskDataShowListByFilter}
        />
      </TablePageBackground>
      <TableAddFab />
      <AlarmFab />
    </>
  )
}

export default TablePage
