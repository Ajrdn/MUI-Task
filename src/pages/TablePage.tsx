import React, { useEffect } from 'react'
import MeltingDataListStore from 'store/MeltingDataListStore'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import { MeltingDataConverter } from 'utils/utils'
import MELTING_TABLE_HEADER_LIST from 'constant/Melting_Table_Header_List'
import TableHeader from 'interface/TableHeader'
import MeltingTableData from 'interface/MeltingTableData'
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
    meltingTableDataDateList,
    meltingTableDataShowList,
    meltingTableDataShowListLength,
    selectMeltingTableDataShowListLength,
    meltingTableDataPasteList,
    meltingTableDataPasteListLength,
    lotNo,
    variety,
    standard,
    length,
    weight,
    setSearchDate,
    setMeltingTableDataDateList,
    filterMeltingTableDataShowList,
    clickTableRow,
    clearMeltingTableDataShowList,
    setMeltingTableDataPasteList,
    setLotNo,
    setVariety,
    setStandard,
    setLength,
    setWeight,
  } = MeltingDataListStore()

  useEffect(() => {
    fetch(
      `http://localhost:8000/taskDataList/${searchDate.format('YYYY-MM-DD')}`
    )
      .then((response) => response.json())
      .then((meltingTableDataDateList: MeltingTableData[]) => {
        setMeltingTableDataDateList(meltingTableDataDateList)
      })
  }, [searchDate, setMeltingTableDataDateList])

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
      top: '192px',
      left: '560px',
    },
    {
      title: '품종',
      size: '300px',
      filterData: variety,
      setFilterData: setVariety,
      top: '192px',
      left: '847px',
    },
    {
      title: '규격',
      size: '300px',
      filterData: standard,
      setFilterData: setStandard,
      top: '192px',
      left: '1147px',
    },
    {
      title: '슬라브 길이',
      size: '300px',
      filterData: length,
      setFilterData: setLength,
      top: '192px',
      left: '1466px',
    },
    {
      title: '중량',
      size: '128px',
      filterData: weight,
      setFilterData: setWeight,
      top: '192px',
      left: '1661px',
    },
  ]

  const pasteFunction = (): Promise<void> => {
    const TaskDataList: MeltingTableData[] = meltingTableDataPasteList.map((taskData) => {
      return {
        ...taskData,
        workDate: searchDate.format('YYYY-MM-DD'),
      }
    })
    return fetch(
      `http://localhost:8000/taskDataList/${searchDate.format('YYYY-MM-DD')}`,
      {
        method: 'PUT',
        body: JSON.stringify(TaskDataList),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((response) => response.json())
      .then((meltingTableDataDateList: MeltingTableData[]) => {
        setMeltingTableDataDateList(meltingTableDataDateList)
      })
  }

  const excelData = () => {
    return meltingTableDataDateList.map((taskData, index) => ({
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
        <TablePageSearchBar<MeltingTableData, MeltingExcelData>
          date={searchDate}
          setDate={setSearchDate}
          tableDataShowListLength={meltingTableDataShowListLength}
          setTableDataDateList={setMeltingTableDataDateList}
          excelDataFunction={excelData}
          dataConverter={MeltingDataConverter}
        />
        <TableData<MeltingTableData>
          tableHeaderList={tableHeaderList}
          pasteFunction={pasteFunction}
          tableDataShowList={meltingTableDataShowList}
          selectTableDataShowListLength={selectMeltingTableDataShowListLength}
          tableDataPasteListLength={meltingTableDataPasteListLength}
          clickTableRow={clickTableRow}
          clearTableDataShowList={clearMeltingTableDataShowList}
          setTableDataPasteList={setMeltingTableDataPasteList}
          filterFunction={filterMeltingTableDataShowList}
        />
      </TablePageBackground>
      <TableAddFab />
      <AlarmFab />
    </>
  )
}

export default TablePage
