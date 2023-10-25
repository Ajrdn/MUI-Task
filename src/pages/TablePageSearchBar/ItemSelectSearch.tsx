import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'


interface ItemSelectSearchProps {
  selectLabel: string
  item: string
  setItem: (item: string) => void
}


const ItemSelectSearch = (props: ItemSelectSearchProps) => {
  const itemChange = (event: SelectChangeEvent) => {
    props.setItem(event.target.value)
  }

  return (
    <FormControl>
      <InputLabel id='item-select-label'>{props.selectLabel}</InputLabel>
      <Select
        labelId='item-select-label'
        id='item-select'
        value={props.item}
        onChange={itemChange}
        label={props.selectLabel}
        sx={{
          width: '155px',
          height: '38px',
        }}
      >
        <MenuItem value='전체'>전체</MenuItem>
        <MenuItem value='LOT No.'>LOT No.</MenuItem>
        <MenuItem value='품종'>품종</MenuItem>
        <MenuItem value='규격'>규격</MenuItem>
        <MenuItem value='슬라브 길이'>슬라브 길이</MenuItem>
        <MenuItem value='중량'>중량</MenuItem>
      </Select>
    </FormControl>
  )
}

export default ItemSelectSearch
