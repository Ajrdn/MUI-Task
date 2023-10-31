import React, { useState } from 'react'
import TableDataCopyStore from 'store/TableDataCopyStore'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import Box from '@mui/material/Box'
import TableHeader from './TableDataHeader'
import TableDataBody from './TableDataBody'
import TableSnackbar, { TableSnackbarProps } from 'pages/TableSnackbar/TableSnackbar'


function TableData() {
  const {
    tableTaskDataRowCopyList,
    tableTaskDataRowPasteList,
    clearTableTaskDataRowCopyList,
    setTableTaskDataRowPasteList,
  } = TableDataCopyStore()

  const [snackbarData, setSnackbarData] = useState<TableSnackbarProps>({
    open: false,
    severity: 'success',
    message: '',
    onClose: () => {
      setSnackbarData({
        ...snackbarData,
        open: false,
      })
    },
  })

  const copyData = (event: React.KeyboardEvent) => {
    if(event.ctrlKey && event.key === 'c') {
      if(tableTaskDataRowCopyList) {
        setSnackbarData(preSnackbarData => ({
          ...preSnackbarData,
          open: true,
          severity: 'success',
          message: '성공적으로 복사되었습니다!',
        }))
        setTableTaskDataRowPasteList()
      } else {
        setSnackbarData(preSnackbarData => ({
          ...preSnackbarData,
          open: true,
          severity: 'warning',
          message: '복사할 데이터가 선택되지 않았습니다.',
        }))
      }
    } else if(event.ctrlKey && event.key === 'v') {
      if(tableTaskDataRowPasteList.length > 0) {
        

        setSnackbarData(preSnackbarData => ({
          ...preSnackbarData,
          open: true,
          severity: 'success',
          message: '성공적으로 붙여넣었습니다!',
        }))
      } else {
        setSnackbarData(preSnackbarData => ({
          ...preSnackbarData,
          open: true,
          severity: 'warning',
          message: '붙여넣기할 데이터가 선택되지 않았습니다.',
        }))
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
      <TableSnackbar {...snackbarData} />
    </TableContainer>
  )
}

export default TableData
