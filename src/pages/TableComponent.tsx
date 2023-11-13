import React, { useState, useEffect } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import TableHeader from 'interface/TableHeader'
import MeltingTableData from 'interface/MeltingTableData'
import TableRowData from 'interface/TableRowData'
import ExcelData from 'interface/ExcelData'
import MeltingData from 'interface/MeltingData'
import TableBar from './TableBar/TableBar'
import TableData from './TableData/TableData'
import TableAddFab from './TableAddFab/TableAddFab'


const TablePageBackground = styled(Box)({
  width: '1520px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
})


function TableComponent() {
  const [date, setDate] = useState<Dayjs>(dayjs())
  const [meltingTableDataList, setMeltingTableDataList] = useState<MeltingTableData[]>([])
  const [meltingTableDataShowList, setMeltingTableDataShowList] = useState<TableRowData<MeltingTableData>[]>([])

  const [lotNo, setLotNo] = useState<string>('')
  const [variety, setVariety] = useState<string>('')
  const [standard, setStandard] = useState<string>('')
  const [length, setLength] = useState<string>('')
  const [weight, setWeight] = useState<string>('')

  const tableHeaderList: TableHeader<MeltingTableData>[] = [
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

  const excelData = meltingTableDataShowList.map(tableDataShow => {
    const meltingExcelData: ExcelData = {}
    const tableHeaderTitleList = tableHeaderList.map(tableHeader => tableHeader.title)
    tableHeaderTitleList.map(title => meltingExcelData[title] = tableDataShow.tableData[title])
    return meltingExcelData
  })

  useEffect(() => {
    fetch(`http://localhost:8000/taskDataList/${date.format('YYYY-MM-DD')}`)
      .then(response => response.json())
      .then((newMeltingDataList: MeltingData[]) => {
        if(lotNo !== '') setLotNo('')
        if(variety !== '') setVariety('')
        if(standard !== '') setStandard('')
        if(length !== '') setLength('')
        if(weight !== '') setWeight('')
        meltingDataListConverter(newMeltingDataList)
      })
  }, [date])

  useEffect(() => {
    filterMeltingTableDataShowList(meltingTableDataList)
  }, [lotNo, variety, standard, length, weight, meltingTableDataList])

  const setNewMeltingTableDataList = (url: string, method: string, body: MeltingData | MeltingData[]): Promise<void> => {
    return fetch(url, {
      method: method,
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then((meltingDataList: MeltingData[]) => {
      meltingDataListConverter(meltingDataList)
    })
  }

  const pasteFunction = (meltingDataPasteList: MeltingTableData[]): Promise<void> => {
    const meltingDataList: MeltingData[] = meltingDataPasteList.map(meltingDataPaste => {
      return {
        id: meltingDataPaste.ID,
        workDate: date.format('YYYY-MM-DD'),
        lotNo: meltingDataPaste['LOT No.'],
        variety: meltingDataPaste.품종,
        standard: meltingDataPaste.규격,
        length: meltingDataPaste['슬라브 길이'],
        weight: meltingDataPaste.중량,
      }
    })
    return setNewMeltingTableDataList(
      `http://localhost:8000/taskDataList/${date.format('YYYY-MM-DD')}`,
      'Put',
      meltingDataList,
    )
  }

  const copyFunction = (meltingDataCopy: MeltingTableData): Promise<void> => {
    const meltingData: MeltingData = {
      id: meltingDataCopy.ID,
      workDate: date.format('YYYY-MM-DD'),
      lotNo: meltingDataCopy['LOT No.'],
      variety: meltingDataCopy.품종,
      standard: meltingDataCopy.규격,
      length: meltingDataCopy['슬라브 길이'],
      weight: meltingDataCopy.중량,
    }
    return setNewMeltingTableDataList(
      `http://localhost:8000/taskDataList/${date.format('YYYY-MM-DD')}`,
      'Post',
      meltingData,
    )
  }

  const modifyFunction = (meltingDataCopy: MeltingTableData): Promise<void> => {
    const meltingData: MeltingData = {
      id: meltingDataCopy.ID,
      workDate: date.format('YYYY-MM-DD'),
      lotNo: meltingDataCopy['LOT No.'],
      variety: meltingDataCopy.품종,
      standard: meltingDataCopy.규격,
      length: meltingDataCopy['슬라브 길이'],
      weight: meltingDataCopy.중량,
    }
    return setNewMeltingTableDataList(
      `http://localhost:8000/taskDataList/update/${date.format('YYYY-MM-DD')}`,
      'Post',
      meltingData,
    )
  }

  const deleteFunction = (meltingDataCopy: MeltingTableData): Promise<void> => {
    const meltingData: MeltingData = {
      id: meltingDataCopy.ID,
      workDate: date.format('YYYY-MM-DD'),
      lotNo: meltingDataCopy['LOT No.'],
      variety: meltingDataCopy.품종,
      standard: meltingDataCopy.규격,
      length: meltingDataCopy['슬라브 길이'],
      weight: meltingDataCopy.중량,
    }
    return setNewMeltingTableDataList(
      `http://localhost:8000/taskDataList/${date.format('YYYY-MM-DD')}`,
      'Delete',
      meltingData,
    )
  }

  const excelFunction = (meltingDataExcelList: MeltingTableData[]): Promise<void> => {
    const meltingDataList: MeltingData[] = meltingDataExcelList.map(meltingDataExcel => {
      return {
        id: meltingDataExcel.ID,
        workDate: date.format('YYYY-MM-DD'),
        lotNo: meltingDataExcel['LOT No.'],
        variety: meltingDataExcel.품종,
        standard: meltingDataExcel.규격,
        length: meltingDataExcel['슬라브 길이'],
        weight: meltingDataExcel.중량,
      }
    })
    return setNewMeltingTableDataList(
      `http://localhost:8000/taskDataList/${date.format('YYYY-MM-DD')}`,
      'Put',
      meltingDataList,
    )
  }

  const meltingTableDataListConverter = (newMeltingTableDataList: MeltingTableData[]) => {
    setMeltingTableDataShowList(newMeltingTableDataList.map((meltingTableDataDate, index) => ({
      index,
      selected: false,
      tableData: meltingTableDataDate,
      tableRowStringData: [
        {
          data: meltingTableDataDate['작업일'],
        },
        {
          data: meltingTableDataDate['LOT No.'],
          key: 'LOT No.',
        },
        {
          data: meltingTableDataDate['품종'],
          key: '품종',
        },
        {
          data: meltingTableDataDate['규격'],
          key: '규격',
        },
        {
          data: meltingTableDataDate['슬라브 길이'],
          key: '슬라브 길이',
        },
        {
          data: meltingTableDataDate['중량'],
          key: '중량',
        },
      ],
    })))
  }

  const meltingDataListConverter = (newMeltingDataList: MeltingData[]) => {
    setMeltingTableDataList(newMeltingDataList.map(meltingData => ({
      ID: meltingData.id,
      작업일: meltingData.workDate,
      'LOT No.': meltingData.lotNo,
      품종: meltingData.variety,
      규격: meltingData.standard,
      '슬라브 길이': meltingData.length,
      중량: meltingData.weight,
    })))
  }

  const filterMeltingTableDataShowList = (newMeltingTableDataDateList: MeltingTableData[]) => {
    const newMeltingTableDataShowList = newMeltingTableDataDateList.filter(meltingTableData =>
      (meltingTableData['LOT No.'].includes(lotNo.toUpperCase()) || meltingTableData['LOT No.'].includes(lotNo.toLowerCase())) &&
      (meltingTableData['품종'].includes(variety.toUpperCase()) || meltingTableData['품종'].includes(variety.toLowerCase())) &&
      (meltingTableData['규격'].includes(standard.toUpperCase()) || meltingTableData['규격'].includes(standard.toLowerCase())) &&
      (meltingTableData['슬라브 길이'].includes(length.toUpperCase()) || meltingTableData['슬라브 길이'].includes(length.toLowerCase())) &&
      (meltingTableData['중량'].includes(weight.toUpperCase()) || meltingTableData['중량'].includes(weight.toLowerCase())))
    meltingTableDataListConverter(newMeltingTableDataShowList)
  }

  return (
    <>
      <TablePageBackground>
        <TableBar<MeltingTableData>
          date={date} // 날짜
          setDate={setDate} // 날짜 변경 시 실행할 함수
          tableDataShowListLength={meltingTableDataShowList.length} // 보여지는 테이블 행 수
          excelFunction={excelFunction} // 액셀 업로드 시 실행할 함수
          excelData={excelData} // 액셀에 나타낼 데이터
        />
        <TableData<MeltingTableData>
          date={date}
          tableHeaderList={tableHeaderList} // 테이블 헤더 리스트
          tableDataShowList={meltingTableDataShowList} // 보여줄 테이블 데이터
          setTableDataShowList={setMeltingTableDataShowList} // 보여줄 테이블 데이터 변경 함수
          no // 테이블에 숫자 열 추가 여부
          pasteFunction={pasteFunction} // 복사(ctrl + c) 후 붙여넣기(ctrl + v) 시 실행할 함수
          copyFunction={copyFunction} // 복사버튼 클릭 시 실행할 함수
          modifyFunction={modifyFunction} // 수정 시 실행할 함수
          deleteFunction={deleteFunction} // 삭제 시 실행할 함수
        />
      </TablePageBackground>
      <TableAddFab setMeltingTableDataList={meltingDataListConverter}/>
    </>
  )
}

export default TableComponent
