import React, { useState } from 'react'
import TextField from '@mui/material/TextField'


interface ItemTextSearchProps {
  textLabel: string
}


const ItemTextSearch = (props: ItemTextSearchProps) => {
  const [text, setText] = useState<string>('')

  const textChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value)
  }

  return (
    <TextField
      focused
      label={props.textLabel}
      placeholder='검색어 입력'
      variant='outlined'
      value={text}
      onChange={textChange}
      sx={{
        width: '330px',
        height: '38px',
      }}
    />
  )
}

export default ItemTextSearch
