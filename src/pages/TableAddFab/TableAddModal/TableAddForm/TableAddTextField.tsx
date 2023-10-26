import React from 'react'
import TextField from '@mui/material/TextField'


function TableAddTextField() {
  return (
    <TextField
      label='아이디'
      placeholder='아이디를 입력하세요.'
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
