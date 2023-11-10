import React, { useState } from 'react'
import { Dayjs } from 'dayjs'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import Box from '@mui/material/Box'
import { useSnackbar } from 'notistack'
import TableHeader from 'interface/TableHeader'
import TableRowData from 'interface/TableRowData'
import { SNACKBAR_ERROR, SNACKBAR_SUCCESS, SNACKBAR_WARNING } from 'constant/Snackbar_Options'
import TableDataHeader from './TableDataHeader'
import TableDataBody from './TableDataBody'


interface TableDataProps<TableDataType> {
  date: Dayjs
  tableHeaderList: TableHeader<TableDataType>[]
  tableDataShowList: TableRowData<TableDataType>[]
  setTableDataShowList: (newTableDataShowList: TableRowData<TableDataType>[]) => void
  setTableDataDateList: (newTableDataDateList: TableDataType[]) => void
  no?: boolean
  pasteFunction?: (tableDataPasteList: TableDataType[]) => Promise<void>
  copyFunction?: (tableData: TableDataType) => void
  copyUrl?: string
  copyMethod?: string
  modifyFunction?: (tableData: TableDataType) => void
  modifyUrl?: string
  modifyMethod?: string
  deleteFunction?: (tableData: TableDataType) => void
  deleteUrl?: string
  deleteMethod?: string
}


function TableData<TableDataType>(props: TableDataProps<TableDataType>) {
  const [tableDataPasteList, setTableDataPasteList] = useState<TableDataType[]>([])
  const { enqueueSnackbar } = useSnackbar()

  const copyData = (event: React.KeyboardEvent) => {
    if(props.pasteFunction) {
      if(event.ctrlKey && event.key === 'c') {
        const selectTableDataShowListLength = props.tableDataShowList.filter(tableDataShow => tableDataShow.selected).length
        if(selectTableDataShowListLength > 0) {
          enqueueSnackbar('성공적으로 복사되었습니다!', SNACKBAR_SUCCESS)
          copyMeltingTableData()
        } else {
          enqueueSnackbar('복사할 데이터가 선택되지 않았습니다.', SNACKBAR_WARNING)
        }
      } else if(event.ctrlKey && event.key === 'v') {
        if(tableDataPasteList.length > 0) {
          props.pasteFunction(tableDataPasteList)
          .then(() => {
            enqueueSnackbar('성공적으로 붙여넣었습니다!', SNACKBAR_SUCCESS)
          })
          .catch(error => {
            enqueueSnackbar('오류가 발생했습니다.', SNACKBAR_ERROR)
          })
        } else {
          enqueueSnackbar('붙여넣기할 데이터가 선택되지 않았습니다.', SNACKBAR_WARNING)
        }
      }
    }
  }

  const clearTableDataShowList = () => {
    props.setTableDataShowList(props.tableDataShowList.map(meltingTableData => ({
      ...meltingTableData,
      selected: false,
    })))
  }

  const copyMeltingTableData = () => {
    setTableDataPasteList(props.tableDataShowList.filter(tableDataShow => tableDataShow.selected).map(tableDataShow => tableDataShow.tableData))
    clearTableDataShowList()
  }

  const clickTableRow = (index: number) => {
    props.setTableDataShowList(props.tableDataShowList.map(tableDataShow => {
      if(index === tableDataShow.index) return {
        ...tableDataShow,
        selected: !tableDataShow.selected
      }
      return tableDataShow
    }))
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
      onBlur={clearTableDataShowList}
    >
      <Table stickyHeader>
        <TableDataHeader<TableDataType>
          date={props.date}
          tableHeaderList={props.tableHeaderList}
          no={props.no}
          copy={props.copyFunction ? true : false}
          modify={props.modifyFunction ? true : false}
          delete={props.deleteFunction ? true : false}
        />
        <TableDataBody<TableDataType>
          clickTableRow={props.pasteFunction ? clickTableRow : undefined}
          tableDataShowList={props.tableDataShowList}
          setTableDataDateList={props.setTableDataDateList}
          no={props.no}
          copyUrl={props.copyUrl}
          copyMethod={props.copyMethod}
          modifyUrl={props.modifyUrl}
          modifyMethod={props.modifyMethod}
          deleteUrl={props.deleteUrl}
          deleteMethod={props.deleteMethod}
        />
      </Table>
    </TableContainer>
  )
}

export default TableData
