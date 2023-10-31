import React from 'react'
import TableDataCopyStore from 'store/TableDataCopyStore'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import Box from '@mui/material/Box'
import TableHeader from './TableDataHeader'
import TableDataBody from './TableDataBody'
import { useSnackbar } from 'notistack'


function TableData() {
  const { enqueueSnackbar } = useSnackbar()

  const {
    tableTaskDataRowCopyList,
    tableTaskDataRowPasteList,
    clearTableTaskDataRowCopyList,
    setTableTaskDataRowPasteList,
  } = TableDataCopyStore()

  const snackbarOptions = {
    variant: '',
    autoHideDuration: 3000,
    disableWindowBlurListener: true,
  }

  const copyData = (event: React.KeyboardEvent) => {
    if(event.ctrlKey && event.key === 'c') {
      if(tableTaskDataRowCopyList) {
        enqueueSnackbar('성공적으로 복사되었습니다!', {
          ...snackbarOptions,
          variant: 'success',
        })
        setTableTaskDataRowPasteList()
      } else {
        enqueueSnackbar('복사할 데이터가 선택되지 않았습니다.', {
          ...snackbarOptions,
          variant: 'warning',
        })
      }
    } else if(event.ctrlKey && event.key === 'v') {
      if(tableTaskDataRowPasteList.length > 0) {
        

        enqueueSnackbar('성공적으로 붙여넣었습니다!', {
          ...snackbarOptions,
          variant: 'success',
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
      onBlur={clearTableTaskDataRowCopyList}
    >
      <Table>
        <TableHeader />
        <TableDataBody />
      </Table>
    </TableContainer>
  )
}

export default TableData
