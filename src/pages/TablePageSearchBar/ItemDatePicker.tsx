import dayjs, { Dayjs } from 'dayjs'
import TableSearchStore from 'store/TableSearchStore'
import TaskDataListStore from 'store/TaskDataListStore'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import 'dayjs/locale/ko'


const ItemDatePicker = () => {
  const date = TableSearchStore(state => state.searchDate)
  const setDate = TableSearchStore(state => state.setSearchDate)

  const setTaskDataShowListByDate = TaskDataListStore(state => state.setTaskDataShowListByDate)

  const dateChange = (newDate: Dayjs | null) => {
    setDate(newDate ?? dayjs())
    setTaskDataShowListByDate(newDate ?? dayjs())
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
        }}
      />
    </LocalizationProvider>
  )
}

export default ItemDatePicker
