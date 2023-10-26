import React from 'react'
import InformDataStore from 'store/InformModalDataStore'
import AlarmModalDataStore from 'store/AlarmModalDataStore'
import Button from '@mui/material/Button'


function BottomButton() {
  const setOpen = InformDataStore(state => state.setOpen)
  const title = InformDataStore(state => state.title)
  const setTitle = InformDataStore(state => state.setTitle)
  const content = InformDataStore(state => state.content)
  const setContent = InformDataStore(state => state.setContent)
  const setTarget = InformDataStore(state => state.setTarget)

  const setAlarmOpen = AlarmModalDataStore(state => state.setOpen)
  const setAlarmTitle = AlarmModalDataStore(state => state.setTitle)
  const setAlarmContent = AlarmModalDataStore(state => state.setContent)

  const sendInform = () => {
    setAlarmTitle(title)
    setAlarmContent(content)

    setTitle('')
    setContent('')
    setTarget('')

    setOpen()
    setAlarmOpen()
  }

  return (
    <Button
      variant='outlined'
      onClick={sendInform}
      sx={{
        width: '100px',
        height: '40px',
        borderRadius: '5px',
        color: '#13243A',
        borderColor: '#13243A',
        fontSize: '15px',
        fontFamily: 'Pretendard',
        fontWeight: 500,
        textAlign: 'center',
        '&:hover': {
          borderColor: '#13243A',
        },
      }}
    >
      보내기
    </Button>
  )
}

export default BottomButton
