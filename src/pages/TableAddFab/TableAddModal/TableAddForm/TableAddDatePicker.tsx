import React from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import TableAddModalDataStore from 'store/TableAddModalDataStore'


function TableAddDatePicker() {
  const date = TableAddModalDataStore(state => state.workDate)
  const setDate = TableAddModalDataStore(state => state.setWorkDate)

  const dateChange = (newDate: Dayjs | null) => {
    setDate(newDate ?? dayjs())
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        value={date}
        onChange={dateChange}
        format='YYYY. MM. DD'
        label='수주일'
        sx={{
          width: '207px',
          height: '42px',
        }}
      />
    </LocalizationProvider>
  )
}

export default TableAddDatePicker
