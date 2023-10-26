import React from 'react'
import { styled } from '@mui/material/styles'
import FormControl from '@mui/material/FormControl'
import TableAddDatePicker from './TableAddDatePicker'
import TableAddTextField from './TableAddTextField'


const TableAddFormControl = styled(FormControl)({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: '45px 39px',
})


function TableAddForm() {
  return (
    <TableAddFormControl>
      <TableAddDatePicker />
      <TableAddTextField />
      <TableAddTextField />
      <TableAddTextField />
      <TableAddTextField />
      <TableAddTextField />
    </TableAddFormControl>
  )
}

export default TableAddForm
