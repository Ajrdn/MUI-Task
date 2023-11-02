import React from 'react'
import TextField from '@mui/material/TextField'


function TableDataFilterTextField() {
  return (
    <TextField
      placeholder='검색어 입력'
      sx={{
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
      }}
    />
  )
}

export default TableDataFilterTextField
