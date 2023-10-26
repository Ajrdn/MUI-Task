import React from 'react'
import InformDataStore from 'store/InformModalDataStore'
import TextField from '@mui/material/TextField'


function TitleField() {
  const title = InformDataStore(state => state.title)
  const setTitle = InformDataStore(state => state.setTitle)

  const titleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

  return (
    <TextField
      placeholder='제목 입력'
      value={title}
      onChange={titleChange}
      sx={{
        width: '100%',
        '& .MuiInputBase-root': {
          height: '51px',
          padding: '15px 20px',
          borderRadius: '4px',
          marginBottom: '10px',
        },
        '& input': {
          padding: 0,
          fontFamily: 'Pretendard',
          fontWeight: 600,
          color: '#C8C8C8',
        },
      }}
    />
  )
}

export default TitleField
