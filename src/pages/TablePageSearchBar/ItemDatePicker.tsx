import React, { useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'


const ItemDatePicker = () => {
  const [date, setDate] = useState<Dayjs | null>(dayjs('2023-10-24'))

  const dateChange = (newDate: Dayjs | null) => {
    setDate(newDate)
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        value={date}
        onChange={dateChange}
        format='YYYY. MM. DD'
        label='날짜'
        sx={{
          width: '156px',
          height: '38px',
        }}
      />
    </LocalizationProvider>
  )
}

export default ItemDatePicker
