import dayjs, { Dayjs } from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import TableSearchStore from 'store/TableSearchStore'


const ItemDatePicker = () => {
  const date = TableSearchStore(state => state.searchDate)
  const setDate = TableSearchStore(state => state.setSearchDate)

  const dateChange = (newDate: Dayjs | null) => {
    setDate(newDate ?? dayjs())
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
