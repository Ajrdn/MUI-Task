import React from 'react'
import TextField from '@mui/material/TextField'


interface TableDataFilterTextFieldProps {
  filterData: string
  filterFunction: (newFilterData: string) => void
}


function TableDataFilterTextField(props: TableDataFilterTextFieldProps) {
  const filterDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.filterFunction(event.target.value)
  }

  return (
    <TextField
      value={props.filterData}
      onChange={filterDataChange}
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
