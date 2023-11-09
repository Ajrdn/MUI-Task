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
      setFilterData: setLotNo,
    },
    {
      title: '품종',
      size: '300px',
      setFilterData: setVariety,
    },
    {
      title: '규격',
      size: '300px',
      setFilterData: setStandard,
    },
    {
      title: '슬라브 길이',
      size: '300px',
      setFilterData: setLength,
    },
    {
      title: '중량',
      size: '128px',
      setFilterData: setWeight,
    },
  ]

  const excelData = meltingTableDataShowList.map(tableDataShow => ({
    [MELTING_TABLE_HEADER_LIST[0]]: tableDataShow.tableData.id,
    [MELTING_TABLE_HEADER_LIST[1]]: tableDataShow.tableData.workDate,
    [MELTING_TABLE_HEADER_LIST[2]]: tableDataShow.tableData.lotNo,
    [MELTING_TABLE_HEADER_LIST[3]]: tableDataShow.tableData.variety,
    [MELTING_TABLE_HEADER_LIST[4]]: tableDataShow.tableData.standard,
    [MELTING_TABLE_HEADER_LIST[5]]: tableDataShow.tableData.length,
    [MELTING_TABLE_HEADER_LIST[6]]: tableDataShow.tableData.weight,
  }))

  useEffect(() => {
    fetch(`http://localhost:8000/taskDataList/${date.format('YYYY-MM-DD')}`)
      .then(response => response.json())
      .then((newMeltingTableDataDateList: MeltingTableData[]) => {
        if(lotNo !== '') setLotNo('')
        if(variety !== '') setVariety('')
        if(standard !== '') setStandard('')
        if(length !== '') setLength('')
        if(weight !== '') setWeight('')
        setMeltingTableDataDateList(newMeltingTableDataDateList)
      })
  }, [date])

  useEffect(() => {
    filterMeltingTableDataShowList(meltingTableDataDateList)
  }, [lotNo, variety, standard, length, weight, meltingTableDataDateList])

  const MeltingTableDataListConverter = (newMeltingTableDataList: MeltingTableData[]) => {
    setMeltingTableDataShowList(newMeltingTableDataList.map((meltingTableDataDate, index) => ({
      index,
      selected: false,
      tableData: meltingTableDataDate,
      tableRowStringData: [
        {
          data: (index + 1).toString().padStart(2, '0'),
        },
        {
          data: meltingTableDataDate.workDate,
        },
        {
          data: meltingTableDataDate.lotNo,
          key: 'lotNo',
        },
        {
          data: meltingTableDataDate.variety,
          key: 'variety',
        },
        {
          data: meltingTableDataDate.standard,
          key: 'standard',
        },
        {
          data: meltingTableDataDate.length,
          key: 'length',
        },
        {
          data: meltingTableDataDate.weight,
          key: 'weight',
        },
      ],
    })))
  }

  const filterMeltingTableDataShowList = (newMeltingTableDataDateList: MeltingTableData[]) => {
    const newMeltingTableDataShowList = newMeltingTableDataDateList.filter(meltingTableData =>
      (meltingTableData.lotNo.includes(lotNo.toUpperCase()) || meltingTableData.lotNo.includes(lotNo.toLowerCase())) &&
      (meltingTableData.variety.includes(variety.toUpperCase()) || meltingTableData.variety.includes(variety.toLowerCase())) &&
      (meltingTableData.standard.includes(standard.toUpperCase()) || meltingTableData.standard.includes(standard.toLowerCase())) &&
      (meltingTableData.length.includes(length.toUpperCase()) || meltingTableData.length.includes(length.toLowerCase())) &&
      (meltingTableData.weight.includes(weight.toUpperCase()) || meltingTableData.weight.includes(weight.toLowerCase())))
    MeltingTableDataListConverter(newMeltingTableDataShowList)
  }

  return (
    <>
      <TablePageBackground>
        <TablePageSearchBar<MeltingTableData, MeltingExcelData>
          date={date} // 날짜
          setDate={setDate} // 날짜 변경 시 실행할 함수
          tableDataShowListLength={meltingTableDataShowList.length} // 보여지는 테이블 행 수
          setTableDataDateList={setMeltingTableDataDateList} // 날짜에 따라 가져올 테이블 데이터 함수
          excelData={excelData} // 액셀에 나타낼 데이터
          dataConverter={MeltingDataConverter} // 액셀에서 받아온 데이터를 테이블 형태로 바꿔주는 함수
        />
        <TableData<MeltingTableData>
          date={date}
          tableHeaderList={tableHeaderList} // 테이블 헤더 리스트
          tableDataShowList={meltingTableDataShowList} // 보여줄 테이블 데이터
          setTableDataShowList={setMeltingTableDataShowList} // 보여줄 테이블 데이터 변경 함수
          setTableDataDateList={setMeltingTableDataDateList} // 원본 테이블 데이터 변경 함수
          pasteUrl={`http://localhost:8000/taskDataList/${date.format('YYYY-MM-DD')}`} // 붙여넣기 시 보낼 백엔드 url
          pasteMethod='Put' // 붙여넣기 시 보낼 백엔드 method
          copy // 복제 기능 추가 여부  (필수 아님)
          copyUrl={`http://localhost:8000/taskDataList/${date.format('YYYY-MM-DD')}`} // 복제 시 보낼 백엔드 url  (필수 아님)
          copyMethod='Post' // 복제 시 보낼 백엔드 method  (필수 아님)
          modify // 수정 기능 추가 여부  (필수 아님)
          modifyUrl={`http://localhost:8000/taskDataList/update/${date.format('YYYY-MM-DD')}`} // 수정 시 보낼 백엔드 url  (필수 아님)
          modifyMethod='Post' // 수정 시 보낼 백엔드 method  (필수 아님)
          delete // 삭제 기능 추가 여부  (필수 아님)
          deleteUrl={`http://localhost:8000/taskDataList/${date.format('YYYY-MM-DD')}`} // 삭제 시 보낼 백엔드 url  (필수 아님)
          deleteMethod='Delete' // 삭제 시 보낼 백엔드 method  (필수 아님)
        />
      </TablePageBackground>
      <TableAddFab
        setMeltingTableDataList={setMeltingTableDataDateList}
      />
    </>
  )
}

export default TablePage
