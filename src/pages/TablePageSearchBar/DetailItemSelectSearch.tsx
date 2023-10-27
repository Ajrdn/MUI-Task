import React from 'react'
import TableSearchStore from 'store/TableSearchStore'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'


function DetailItemSelectSearch() {
  const item = TableSearchStore(state => state.searchItem)
  const detailItem = TableSearchStore(state => state.searchDetailItem)
  const setDetailItem = TableSearchStore(state => state.setSearchDetailItem)
  const setDetailText = TableSearchStore(state => state.setSearchDetailWord)
  const menuList = TableSearchStore(state => state.menuList)

  const itemChange = (event: SelectChangeEvent) => {
    const menu = event.target.value

    if(menu === '전체' || menu === 'LOT No.' || menu === '품종' || menu === '규격' || menu === '슬라브 길이' || menu === '중량') setDetailItem(menu)
    setDetailText('')
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
        상세 검색 항목
      </InputLabel>
      <Select
        labelId='item-select-label'
        id='item-select'
        value={detailItem}
        onChange={itemChange}
        label='상세 검색 항목'
        sx={{
          width: '155px',
          height: '38px',
          color: '#13243A',
          fontSize: '16px',
          fontFamily: 'Pretendard',
          fontWeight: 400,
        }}
      >
        {menuList.filter(menu => menu === '전체' || menu !== item).map(menu => (
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

export default DetailItemSelectSearch
