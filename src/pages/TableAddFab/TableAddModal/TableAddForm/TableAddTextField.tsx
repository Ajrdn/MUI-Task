import React from 'react'
import TextField from '@mui/material/TextField'


interface TableAddTextFieldProps {
  label: string
  placeholder: string
}


function TableAddTextField(props: TableAddTextFieldProps) {
  return (
    <TextField
      label={props.label}
      placeholder={props.placeholder}
      variant='standard'
      focused
      sx={{
        width: '207px',
        height: '42px',
      }}
    />
  )
}

export default TableAddTextField
