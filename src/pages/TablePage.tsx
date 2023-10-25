import React from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import TablePageSearchBar from './TablePageSearchBar/TablePageSearchBar'
import TableData from './TableData/TableData'
import TableAddFab from './TableAddFab/TableAddFab'
import AlarmFab from 'components/AlarmFab/AlarmFab'
import InformFab from 'components/InformFab/InformFab'


const TablePageBackground = styled(Box)({
  width: '1520px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
})


const TablePage = () => {
  return (
    <>
      <TablePageBackground>
        <TablePageSearchBar />
        <TableData />
      </TablePageBackground>
      <TableAddFab />
      <InformFab />
      <AlarmFab />
    </>
  )
}

export default TablePage
