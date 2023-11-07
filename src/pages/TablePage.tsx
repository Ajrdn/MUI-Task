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

  const excelData = meltingTableDataDateList.map((taskData, index) => ({
    [MELTING_TABLE_HEADER_LIST[0]]: (index + 1).toString().padStart(2, '0'),
    [MELTING_TABLE_HEADER_LIST[1]]: taskData.workDate,
    [MELTING_TABLE_HEADER_LIST[2]]: taskData.lotNo,
    [MELTING_TABLE_HEADER_LIST[3]]: taskData.variety,
    [MELTING_TABLE_HEADER_LIST[4]]: taskData.standard,
    [MELTING_TABLE_HEADER_LIST[5]]: taskData.length,
    [MELTING_TABLE_HEADER_LIST[6]]: taskData.weight,
  }))

  const pasteFunction = (): Promise<void> => {
    const TaskDataList: MeltingTableData[] = meltingTableDataPasteList.map(taskData => {
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
      .then(response => response.json())
      .then((meltingTableDataDateList: MeltingTableData[]) => {
        setMeltingTableDataDateList(meltingTableDataDateList)
      })
  }

  return (
    <>
      <TablePageBackground>
        <TablePageSearchBar<MeltingTableData, MeltingExcelData>
          date={searchDate} // 날짜
          setDate={setSearchDate} // 날짜 변경 시 실행할 함수
          tableDataShowListLength={meltingTableDataShowListLength} // 보여지는 테이블 행 수
          setTableDataDateList={setMeltingTableDataDateList} // 날짜에 따라 가져올 테이블 데이터 함수
          excelData={excelData} // 액셀에 나타낼 데이터
          dataConverter={MeltingDataConverter} // 액셀에서 받아온 데이터를 테이블 형태로 바꿔주는 함수
        />
        <TableData<MeltingTableData>
          tableHeaderList={tableHeaderList} // 테이블 헤더 리스트
          pasteFunction={pasteFunction} // 복사 시 실행할 함수
          tableDataShowList={meltingTableDataShowList} // 보여줄 테이블 데이터
          selectTableDataShowListLength={selectMeltingTableDataShowListLength} // 선택된(클릭 시 회색을 띄우는) 행 수
          tableDataPasteListLength={meltingTableDataPasteListLength} // 복사된 데이터 수
          clickTableRow={clickTableRow} // 데이터 행 클릭 시 실행할 함수
          clearTableDataShowList={clearMeltingTableDataShowList} // 데이블 바깥 클릭 시 실행할 함수
          setTableDataPasteList={setMeltingTableDataPasteList} // 복사 시(ctrl + v를 할 시) 실행할 함수
          filterFunction={filterMeltingTableDataShowList} // 필터링할 함수
          copy
          modify
          delete
        />
      </TablePageBackground>
      <TableAddFab />
      <AlarmFab />
    </>
  )
}

export default TablePage
