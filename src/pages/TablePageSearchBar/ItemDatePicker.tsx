import dayjs, { Dayjs } from 'dayjs'
import TableSearchStore from 'store/TableSearchStore'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import 'dayjs/locale/ko'


const ItemDatePicker = () => {
  const date = TableSearchStore(state => state.searchDate)
  const setDate = TableSearchStore(state => state.setSearchDate)

  const dateChange = (newDate: Dayjs | null) => {
    setDate(newDate ?? dayjs())
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='ko'>
      <DatePicker
        value={date}
        onChange={dateChange}
        format='YYYY. MM. DD'
        label='날짜'
        sx={{
          width: '156px',
          height: '38px',
          '& input': {
            fontSize: '16px',
            fontFamily: 'Pretendard',
            fontWeight: 400,
            color: '#13243A',
          },
          '& label': {
            fontFamily: 'Pretendard',
            fontWeight: 600,
            color: '#878787',
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

export default ItemDatePicker
