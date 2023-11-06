import React from 'react'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'


const FilterTextField = styled(TextField)({
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
})


interface TableDataFilterTextFieldProps {
  filterData: string
  setFilterData: (event: React.ChangeEvent<HTMLInputElement>) => void
}


function TableDataFilterTextField(props: TableDataFilterTextFieldProps) {
  return (
    <FilterTextField
      focused
      label='검색어 입력'
      value={props.filterData}
      onChange={props.setFilterData}
      placeholder='검색어 입력'
    />
  )
}

export default TableDataFilterTextField
