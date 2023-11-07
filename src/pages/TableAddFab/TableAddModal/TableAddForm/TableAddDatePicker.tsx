import React from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import 'dayjs/locale/ko'


interface TableAddDatePickerProps {
  date: Dayjs
  setDate: (newDate: Dayjs) => void
}


function TableAddDatePicker(props: TableAddDatePickerProps) {

  const dateChange = (newDate: Dayjs | null) => {
    props.setDate(newDate ?? dayjs())
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='ko'>
      <DatePicker
        value={props.date}
        onChange={dateChange}
        format='YYYY. MM. DD'
        label='수주일'
        sx={{
          width: '207px',
          height: '42px',
          '& input': {
            fontSize: '16px',
            fontFamily: 'Pretendard',
            fontWeight: 400,
            color: '#13243A',
          },
          '& label': {
            fontFamily: 'Pretendard',
            fontWeight: 600,
            color: '#616161',
          },
          '& .MuiIconButton-root': {
            color: '#14325A',
          },
          '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline, & .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
            border: '1px solid #14325A',
          },
        }}
      />
    </LocalizationProvider>
  )
}

export default TableAddDatePicker
