import React from 'react'
import { styled } from '@mui/material/styles'
import FormControl from '@mui/material/FormControl'
import TableAddFormField from './TableAddFormField'
import TableAddFormButton from './TableAddFormButton'


const TableAddFormControl = styled(FormControl)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
})


function TableAddForm() {
  return (
    <TableAddFormControl>
      <TableAddFormField />
      <TableAddFormButton />
    </TableAddFormControl>
  )
}

export default TableAddForm
