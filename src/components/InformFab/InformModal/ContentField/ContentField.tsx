import React from 'react'
import InformDataStore from 'store/InformModalDataStore'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'


const ContentFieldBox = styled(Box)({
  width: '100%',
  height: '258px',
  padding: '20px 30px 30px',
  border: '1px solid #C8C8C8',
  borderRadius: '4px',
  marginBottom: '20px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
})


function ContentField() {
  const content = InformDataStore(state => state.content)
  const setContent = InformDataStore(state => state.setContent)

  const contentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value)
  }

  return (
    <ContentFieldBox>
      <Typography sx={{
        fontSize: '12px',
        fontFamily: 'Pretendard',
        fontWeight: 600,
        color: '#878787',
      }}>
        알림 내용 작성
      </Typography>
      <TextField
        variant='standard'
        placeholder='알림 내용 작성'
        value={content}
        onChange={contentChange}
        multiline
        maxRows={8}
        InputProps={{
          disableUnderline: true,
        }}
        sx={{
          width: '640px',
          height: '184px',
          '& textarea': {
            fontSize: '16px',
            fontFamily: 'Pretendard',
            fontWeight: 400,
            color: '#C8C8C8',
          },
        }}
      />
    </ContentFieldBox>
  )
}

export default ContentField
