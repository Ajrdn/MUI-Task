import React, { useState, useEffect } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import { MeltingDataConverter } from 'utils/utils'
import MELTING_TABLE_HEADER_LIST from 'constant/Melting_Table_Header_List'
import TableHeader from 'interface/TableHeader'
import MeltingTableData from 'interface/MeltingTableData'
import MeltingExcelData from 'interface/MeltingExcelData'
import TableRowData from 'interface/TableRowData'
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
  const [date, setDate] = useState<Dayjs>(dayjs())
  const [meltingTableDataDateList, setMeltingTableDataDateList] = useState<MeltingTableData[]>([])
  const [meltingTableDataShowList, setMeltingTableDataShowList] = useState<TableRowData<MeltingTableData>[]>([])

  const [lotNo, setLotNo] = useState<string>('')
  const [variety, setVariety] = useState<string>('')
  const [standard, setStandard] = useState<string>('')
  const [length, setLength] = useState<string>('')
  const [weight, setWeight] = useState<string>('')

  const setMeltingTableDataList = (newMeltingTableDataList: MeltingTableData[]) => {
    setMeltingTableDataDateList(newMeltingTableDataList)
    setMeltingTableDataShowList(newMeltingTableDataList.map((meltingTableData, index) => ({
      index,
      selected: false,
      tableData: meltingTableData,
      tableRowData: [
        (index + 1).toString().padStart(2, '0'),
        meltingTableData.workDate,
        meltingTableData.lotNo,
        meltingTableData.variety,
        meltingTableData.standard,
        meltingTableData.length,
        meltingTableData.weight,
      ],
    })))
  }

  useEffect(() => {
    fetch(`http://localhost:8000/taskDataList/${date.format('YYYY-MM-DD')}`)
      .then(response => response.json())
      .then((meltingTableDataDateList: MeltingTableData[]) => {
        setMeltingTableDataList(meltingTableDataDateList)
      })
  }, [date])

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

  const excelData = meltingTableDataShowList.map((tableDataShow, index) => ({
    [MELTING_TABLE_HEADER_LIST[0]]: (index + 1).toString().padStart(2, '0'),
    [MELTING_TABLE_HEADER_LIST[1]]: tableDataShow.tableData.workDate,
    [MELTING_TABLE_HEADER_LIST[2]]: tableDataShow.tableData.lotNo,
    [MELTING_TABLE_HEADER_LIST[3]]: tableDataShow.tableData.variety,
    [MELTING_TABLE_HEADER_LIST[4]]: tableDataShow.tableData.standard,
    [MELTING_TABLE_HEADER_LIST[5]]: tableDataShow.tableData.length,
    [MELTING_TABLE_HEADER_LIST[6]]: tableDataShow.tableData.weight,
  }))

  const filterMeltingTableDataShowList = () => {
    const newMeltingTableDataShowList = meltingTableDataDateList.filter(meltingTableData =>
      (meltingTableData.lotNo.includes(lotNo.toUpperCase()) || meltingTableData.lotNo.includes(lotNo.toLowerCase())) &&
      (meltingTableData.variety.includes(variety.toUpperCase()) || meltingTableData.variety.includes(variety.toLowerCase())) &&
      (meltingTableData.standard.includes(standard.toUpperCase()) || meltingTableData.standard.includes(standard.toLowerCase())) &&
      (meltingTableData.length.includes(length.toUpperCase()) || meltingTableData.length.includes(length.toLowerCase())) &&
      (meltingTableData.weight.includes(weight.toUpperCase()) || meltingTableData.weight.includes(weight.toLowerCase())))
    setMeltingTableDataShowList(newMeltingTableDataShowList.map((meltingTableDataDate, index) => ({
      index,
      selected: false,
      tableData: meltingTableDataDate,
      tableRowData: [
        (index + 1).toString().padStart(2, '0'),
        meltingTableDataDate.workDate,
        meltingTableDataDate.lotNo,
        meltingTableDataDate.variety,
        meltingTableDataDate.standard,
        meltingTableDataDate.length,
        meltingTableDataDate.weight,
      ],
    })))
  }

  return (
    <>
      <TablePageBackground>
        <TablePageSearchBar<MeltingTableData, MeltingExcelData>
          date={date} // 날짜
          setDate={setDate} // 날짜 변경 시 실행할 함수
          tableDataShowListLength={meltingTableDataShowList.length} // 보여지는 테이블 행 수
          setTableDataDateList={setMeltingTableDataList} // 날짜에 따라 가져올 테이블 데이터 함수
          excelData={excelData} // 액셀에 나타낼 데이터
          dataConverter={MeltingDataConverter} // 액셀에서 받아온 데이터를 테이블 형태로 바꿔주는 함수
        />
        <TableData<MeltingTableData>
          date={date}
          tableHeaderList={tableHeaderList} // 테이블 헤더 리스트
          tableDataShowList={meltingTableDataShowList} // 보여줄 테이블 데이터
          setTableDataShowList={setMeltingTableDataShowList} // 보여줄 테이블 데이터 변경 함수
          setTableDataDateList={setMeltingTableDataList} // 원본 테이블 데이터 변경 함수
          filterFunction={filterMeltingTableDataShowList} // 필터링할 함수
          copyUrl={`http://localhost:8000/taskDataList/${date.format('YYYY-MM-DD')}`}
          copyMethod='Put'
        />
      </TablePageBackground>
      <TableAddFab
        setMeltingTableDataList={setMeltingTableDataList}
      />
      <AlarmFab />
    </>
  )
}

export default TablePage
