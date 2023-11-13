import React, { useState, useEffect } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { styled, ThemeProvider } from '@mui/material/styles'
import { theme } from './theme/theme'
import Box from '@mui/material/Box'
import MeltingTableData from 'interface/MeltingTableData'
import TableHeader from 'interface/TableHeader'
import MeltingData from 'interface/MeltingData'
import TableComponent from './pages/TableComponent'
import TableAddFab from 'pages/TableAddFab/TableAddFab'


const PageBackground = styled(Box)({
  boxSizing: 'border-box',
  width: '100vw',
  height: '100vh',
  padding: '80px 0',
  display: 'flex',
  justifyContent: 'center',
  position: 'relative',
})


function App() {
  const [date, setDate] = useState<Dayjs>(dayjs())
  const [meltingTableDataList, setMeltingTableDataList] = useState<MeltingTableData[]>([])
  
  const [lotNo, setLotNo] = useState<string>('')
  const [variety, setVariety] = useState<string>('')
  const [standard, setStandard] = useState<string>('')
  const [length, setLength] = useState<string>('')
  const [weight, setWeight] = useState<string>('')

  const tableHeaderList: TableHeader<MeltingTableData>[] = [
    {
      key: '작업일',
      size: '128px',
    },
    {
      key: 'LOT No.',
      size: '300px',
      filterData: lotNo,
      setFilterData: setLotNo,
    },
    {
      key: '품종',
      size: '300px',
      filterData: variety,
      setFilterData: setVariety,
    },
    {
      key: '규격',
      size: '300px',
      filterData: standard,
      setFilterData: setStandard,
    },
    {
      key: '슬라브 길이',
      size: '300px',
      filterData: length,
      setFilterData: setLength,
    },
    {
      key: '중량',
      size: '128px',
      filterData: weight,
      setFilterData: setWeight,
    },
  ]

  useEffect(() => {
    fetch(`http://localhost:8000/taskDataList/${date.format('YYYY-MM-DD')}`)
      .then(response => response.json())
      .then((newMeltingDataList: MeltingData[]) => {
        for(const tableHeader of tableHeaderList) {
          if(tableHeader.filterData !== undefined && tableHeader.filterData !== '') tableHeader.setFilterData!('')
        }
        meltingDataListConverter(newMeltingDataList)
      })
  }, [date])

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

  return (
    <ThemeProvider theme={theme}>
      <PageBackground>
        <TableComponent<MeltingTableData>
          date={date} // 날짜
          setDate={setDate} // 날짜 변경 시 실행할 함수
          tableHeaderList={tableHeaderList} // 테이블 헤더 리스트
          tableDataList={meltingTableDataList}
          excelFunction={excelFunction} // 액셀 업로드 시 실행할 함수
          no // 테이블에 숫자 열 추가 여부
          pasteFunction={pasteFunction} // 복사(ctrl + c) 후 붙여넣기(ctrl + v) 시 실행할 함수
        />
      </PageBackground>
      <TableAddFab setMeltingTableDataList={meltingDataListConverter}/>
    </ThemeProvider>
  )
}

export default App
