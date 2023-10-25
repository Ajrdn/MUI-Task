import TextField from '@mui/material/TextField'


interface ItemTextSearchProps {
  textLabel: string
  text: string
  setText: (text: string) => void
}


const ItemTextSearch = (props: ItemTextSearchProps) => {
  const textChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setText(event.target.value)
  }

  return (
    <TextField
      focused
      label={props.textLabel}
      placeholder='검색어 입력'
      variant='outlined'
      value={props.text}
      onChange={textChange}
      sx={{
        width: '330px',
        height: '38px',
      }}
    />
  )
}

export default ItemTextSearch
