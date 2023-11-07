import React from 'react'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import Box from '@mui/material/Box'
import { useSnackbar } from 'notistack'
import TableDataHeader from './TableDataHeader'
import TableDataBody from './TableDataBody'
import TableHeader from 'interface/TableHeader'
import TableRowData from 'interface/TableRowData'


interface TableDataProps<TableDataType> {
  tableHeaderList: TableHeader[]
  pasteFunction: () => Promise<void>
  tableDataShowList: TableRowData<TableDataType>[]
  selectTableDataShowListLength: number
  tableDataPasteListLength: number
  clickTableRow: (index: number) => void
  clearTableDataShowList: () => void
  setTableDataPasteList: () => void
  filterFunction: () => void
  copy?: boolean
  modify?: boolean
  delete?: boolean
}


function TableData<TableDataType>(props: TableDataProps<TableDataType>) {
  const { enqueueSnackbar } = useSnackbar()

  const snackbarOptions = {
    autoHideDuration: 3000,
    disableWindowBlurListener: true,
  }

  const copyData = (event: React.KeyboardEvent) => {
    if(event.ctrlKey && event.key === 'c') {
      if(props.selectTableDataShowListLength > 0) {
        enqueueSnackbar('성공적으로 복사되었습니다!', {
          ...snackbarOptions,
          variant: 'success',
        })
        props.setTableDataPasteList()
      } else {
        enqueueSnackbar('복사할 데이터가 선택되지 않았습니다.', {
          ...snackbarOptions,
          variant: 'warning',
        })
      }
    } else if(event.ctrlKey && event.key === 'v') {
      if(props.tableDataPasteListLength > 0) {
        props.pasteFunction()
        .finally(() => {
          enqueueSnackbar('성공적으로 붙여넣었습니다!', {
            ...snackbarOptions,
            variant: 'success',
          })
        })
      } else {
        enqueueSnackbar('붙여넣기할 데이터가 선택되지 않았습니다.', {
          ...snackbarOptions,
          variant: 'warning',
        })
      }
    }
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
      onBlur={props.clearTableDataShowList}
    >
      <Table stickyHeader>
        <TableDataHeader
          tableHeaderList={props.tableHeaderList}
          filterFunction={props.filterFunction}
          copy={props.copy}
          modify={props.modify}
          delete={props.delete}
        />
        <TableDataBody<TableDataType>
          clickTableRow={props.clickTableRow}
          tableDataShowList={props.tableDataShowList}
          copy={props.copy}
          modify={props.modify}
          delete={props.delete}
        />
      </Table>
    </TableContainer>
  )
}

export default TableData
