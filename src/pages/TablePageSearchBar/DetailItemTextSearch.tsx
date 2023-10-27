import TableSearchStore from 'store/TableSearchStore'
import TextField from '@mui/material/TextField'


function DetailItemTextSearch() {
  const item = TableSearchStore(state => state.searchItem)
  const text = TableSearchStore(state => state.searchDetailWord)
  const setText = TableSearchStore(state => state.setSearchDetailWord)

  const textChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value)
  }

  return (
    <TextField
      disabled={item === '전체'}
      label='상세 검색'
      variant='outlined'
      placeholder='검색어 입력'
      InputLabelProps={{ shrink: true }}
      value={text}
      onChange={textChange}
      sx={{
        width: '330px',
        height: '38px',
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

export default DetailItemTextSearch
