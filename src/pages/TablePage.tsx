import React from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import TablePageSearchBar from './TablePageSearchBar/TablePageSearchBar'


const TablePageBackground = styled(Box)({
  width: '1520px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
})


const TablePage = () => {
  return (
    <TablePageBackground>
      <TablePageSearchBar />
    </TablePageBackground>
  )
}

export default TablePage
