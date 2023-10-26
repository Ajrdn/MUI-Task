import React from 'react'
import TextField from '@mui/material/TextField'


interface TableAddTextFieldProps {
  label: string
}


function TableAddTextField(props: TableAddTextFieldProps) {
  return (
    <TextField
      label={props.label}
      placeholder={`${props.label} 입력`}
      variant='standard'
      focused
      sx={{
        width: '207px',
        height: '42px',
        '& .MuiInput-underline:after': {
          borderBottomColor: '#C8C8C8',
        },
        '& input': {
          fontSize: '16px',
          fontFamily: 'Pretendard',
          fontWeight: 400,
          color: '#13243A',
        },
        '& input::placeholder': {
          fontSize: '16px',
          fontFamily: 'Pretendard',
          fontWeight: 400,
          color: '#C8C8C8',
        },
        '& label': {
          fontFamily: 'Pretendard',
          fontWeight: 600,
          color: '#878787',
        },
      }}
    />
  )
}

export default TableAddTextField
