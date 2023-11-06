import React, { useEffect }  from 'react'
import TaskDataListStore from 'store/TaskDataListStore'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import { MeltingDataConverter } from 'utils/utils'
import MELTING_TABLE_HEADER_LIST from 'constant/Melting_Table_Header_List'
import TableHeader from 'interface/TableHeader'
import TaskData from 'interface/TaskData'
import MeltingExcelData from 'interface/MeltingExcelData'
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
  const {
    searchDate,
    taskDataDateList,
    taskDataShowList,
    taskDataShowListLength,
    selectTaskDataShowListLength,
    taskDataPasteList,
    taskDataPasteListLength,
    lotNo,
    variety,
    standard,
    length,
    weight,
    setSearchDate,
    setTaskDataDateList,
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

  useEffect(() => {
    fetch(`http://localhost:8000/taskDataList/${searchDate.format('YYYY-MM-DD')}`)
    .then(response => response.json())
    .then((taskDataDateList: TaskData[]) => {
      setTaskDataDateList(taskDataDateList)
    })
  }, [searchDate, setTaskDataDateList])

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
        workDate: searchDate.format('YYYY-MM-DD')
      }
    })
    return fetch(`http://localhost:8000/taskDataList/${searchDate.format('YYYY-MM-DD')}`, {
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

  const excelData = () => {
    return taskDataDateList.map((taskData, index) => ({
      [MELTING_TABLE_HEADER_LIST[0]]: (index + 1).toString().padStart(2, '0'),
      [MELTING_TABLE_HEADER_LIST[1]]: taskData.workDate,
      [MELTING_TABLE_HEADER_LIST[2]]: taskData.lotNo,
      [MELTING_TABLE_HEADER_LIST[3]]: taskData.variety,
      [MELTING_TABLE_HEADER_LIST[4]]: taskData.standard,
      [MELTING_TABLE_HEADER_LIST[5]]: taskData.length,
      [MELTING_TABLE_HEADER_LIST[6]]: taskData.weight,
    }))
  }

  return (
    <>
      <TablePageBackground>
        <TablePageSearchBar<TaskData, MeltingExcelData>
          date={searchDate}
          setDate={setSearchDate}
          tableDataShowListLength={taskDataShowListLength}
          setTableDataDateList={setTaskDataDateList}
          excelDataFunction={excelData}
          dataConverter={MeltingDataConverter}
        />
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
