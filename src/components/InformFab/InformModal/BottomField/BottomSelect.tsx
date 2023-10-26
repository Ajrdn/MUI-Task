import React from 'react'
import InformDataStore from 'store/InformModalDataStore'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Target from 'interface/Target'


function BottomSelect() {
  const target = InformDataStore(state => state.target)
  const setTarget = InformDataStore(state => state.setTarget)

  const targetChange = (event: SelectChangeEvent) => {
    const menu = event.target.value

    if(menu === '생산관리' || menu === '용해' || menu === '슬라브 절단' || menu === '슬라브 가열' || menu === '가열 압연' || menu === '전체 공정') setTarget(menu)
  }

  const menuList: Target[] = [
    '생산관리',
    '용해',
    '슬라브 절단',
    '슬라브 가열',
    '가열 압연',
    '전체 공정',
  ]

  return (
    <Select
      value={target}
      onChange={targetChange}
      sx={{
        width: '328px',
        height: '100%',
        color: '#878787',
        fontSize: '18px',
        fontFamily: 'Pretendard',
        fontWeight: 400,
      }}
    >
      {menuList.map(menu => <MenuItem key={menu} value={menu}>{menu}</MenuItem>)}
    </Select>
  )
}

export default BottomSelect
