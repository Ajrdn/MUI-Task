import React, { useState } from 'react'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'


interface ItemSelectSearchProps {
  selectLabel: string
}


const ItemSelectSearch = (props: ItemSelectSearchProps) => {
  const [item, setItem] = useState<string>('전체')

  const itemChange = (event: SelectChangeEvent) => {
    setItem(event.target.value)
  }

  return (
    <FormControl>
      <InputLabel id='item-select-label'>{props.selectLabel}</InputLabel>
      <Select
        labelId='item-select-label'
        id='item-select'
        value={item}
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
