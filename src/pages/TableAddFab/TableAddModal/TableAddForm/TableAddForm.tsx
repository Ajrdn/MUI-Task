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
      <TableAddTextField
        label='LOT No.'
      />
      <TableAddTextField
        label='품종'
      />
      <TableAddTextField
        label='규격'
      />
      <TableAddTextField
        label='수량'
      />
      <TableAddTextField
        label='중량'
      />
    </TableAddFormControl>
  )
}

export default TableAddForm
