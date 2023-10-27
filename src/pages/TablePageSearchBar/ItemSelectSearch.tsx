import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import SearchMenu from 'interface/SearchMenu'


interface ItemSelectSearchProps {
  selectLabel: string
  item: SearchMenu
  setItem: (item: SearchMenu) => void
  disabled?: boolean
}


const ItemSelectSearch = (props: ItemSelectSearchProps) => {
  const menuList: SearchMenu[] = [
    '전체',
    'LOT No.',
    '품종',
    '규격',
    '슬라브 길이',
    '중량',
  ]

  const itemChange = (event: SelectChangeEvent) => {
    const menu = event.target.value

    if(
      menu === '전체' ||
      menu === 'LOT No.' ||
      menu === '품종' ||
      menu === '규격' ||
      menu === '슬라브 길이' ||
      menu === '중량'
    )
      props.setItem(menu)
  }

  return (
    <FormControl>
      <InputLabel
        id='item-select-label'
        sx={{
          fontFamily: 'Pretendard',
          fontWeight: 600,
          color: '#878787',
        }}
      >
        {props.selectLabel}
      </InputLabel>
      <Select
        labelId='item-select-label'
        id='item-select'
        value={props.item}
        onChange={itemChange}
        label={props.selectLabel}
        disabled={props.disabled}
        sx={{
          width: '155px',
          height: '38px',
          color: '#13243A',
          fontSize: '16px',
          fontFamily: 'Pretendard',
          fontWeight: 400,
        }}
      >
        {menuList.map(menu => (
          <MenuItem
            key={menu}
            value={menu}
            sx={{
              color: '#13243A',
              fontSize: '16px',
              fontFamily: 'Pretendard',
              fontWeight: 400,
            }}
          >
            {menu}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default ItemSelectSearch
