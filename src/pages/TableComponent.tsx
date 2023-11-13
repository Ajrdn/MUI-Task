import React, { useState, useEffect } from 'react'
import { Dayjs } from 'dayjs'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import TableHeader from 'interface/TableHeader'
import TableRowData from 'interface/TableRowData'
import ExcelData from 'interface/ExcelData'
import TableBar from './TableBar/TableBar'
import TableData from './TableData/TableData'
import TableRowStringData from 'interface/TableRowStringData'


const TablePageBackground = styled(Box)({
  width: '1520px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
})


interface TableComponentProps<TableDataType> {
  date: Dayjs
  setDate: (date: Dayjs) => void
  tableHeaderList: TableHeader<TableDataType>[]
  tableDataList: TableDataType[]
  excelFunction: (tableDataExcelList: TableDataType[]) => void
  no?: boolean
  pasteFunction?: (tableDataPasteList: TableDataType[]) => Promise<void>
  copyFunction?: (tableData: TableDataType) => Promise<void>
  modifyFunction?: (tableData: TableDataType) => Promise<void>
  deleteFunction?: (tableData: TableDataType) => Promise<void>
}


function TableComponent<TableDataType>(props: TableComponentProps<TableDataType>) {
  const [tableDataShowList, setTableDataShowList] = useState<TableRowData<TableDataType>[]>([])
  const tableKeyList = props.tableHeaderList.map(tableHeader => tableHeader.key)
  const excelData = tableDataShowList.map(tableDataShow => {
    const tableExcelData: ExcelData = {}
    for(const key of tableKeyList) {
      tableExcelData[key as string] = tableDataShow.tableData[key] as string
    }
    return tableExcelData
  })

  useEffect(() => {
    tableDataListConverter(props.tableDataList)
  }, [props.tableDataList])

  useEffect(() => {
    filterTableDataShowList()
  }, [...props.tableHeaderList.filter(tableHeader => tableHeader.filterData !== undefined).map(tableHeader => tableHeader.filterData), props.tableDataList])

  const tableDataListConverter = (newTableDataList: TableDataType[]) => {
    setTableDataShowList(newTableDataList.map((tableData, index) => {
      const tableRowStringData: TableRowStringData<TableDataType>[] = props.tableHeaderList.map(tableHeader => ({
        data: tableData[tableHeader.key] as string,
        key: tableHeader.setFilterData ? tableHeader.key : undefined,
      }))
      return {
        index,
        selected: false,
        tableData,
        tableRowStringData,
      }
    }))
  }

  const filterTableDataShowList = () => {
    const filterList = props.tableHeaderList.filter(tableHeader => tableHeader.filterData !== undefined).map(tableHeader => ({
      key: tableHeader.key,
      filterData: tableHeader.filterData,
    }))
    const newMeltingTableDataShowList = props.tableDataList.filter(tableData =>
      filterList.map(filter => (tableData[filter.key] as string).includes(filter.filterData!.toUpperCase()) || (tableData[filter.key] as string).includes(filter.filterData!.toLowerCase()))
      .reduce((filterData, checkFilter) => filterData && checkFilter, true))
    tableDataListConverter(newMeltingTableDataShowList)
  }

  return (
    <>
      <TablePageBackground>
        <TableBar<TableDataType>
          date={props.date} // 날짜
          setDate={props.setDate} // 날짜 변경 시 실행할 함수
          tableDataShowListLength={tableDataShowList.length} // 보여지는 테이블 행 수
          excelFunction={props.excelFunction} // 액셀 업로드 시 실행할 함수
          excelData={excelData} // 액셀에 나타낼 데이터
        />
        <TableData<TableDataType>
          date={props.date}
          tableHeaderList={props.tableHeaderList} // 테이블 헤더 리스트
          tableDataShowList={tableDataShowList} // 보여줄 테이블 데이터
          setTableDataShowList={setTableDataShowList} // 보여줄 테이블 데이터 변경 함수
          no={props.no} // 테이블에 숫자 열 추가 여부
          pasteFunction={props.pasteFunction} // 복사(ctrl + c) 후 붙여넣기(ctrl + v) 시 실행할 함수
          copyFunction={props.copyFunction} // 복사버튼 클릭 시 실행할 함수
          modifyFunction={props.modifyFunction} // 수정 시 실행할 함수
          deleteFunction={props.deleteFunction} // 삭제 시 실행할 함수
        />
      </TablePageBackground>
    </>
  )
}

export default TableComponent
