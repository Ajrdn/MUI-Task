import React from 'react'
import AlarmModalDataStore from 'store/AlarmModalDataStore'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import ErrorOutline from '@mui/icons-material/ErrorOutline'
import ModalBackground from 'components/ModalBackground/ModalBackground'
import ModalContentBox from 'components/ModalContentBox/ModalContentBox'
import ModalCloseButton from 'components/ModalCloseButton/ModalCloseButton'
import AlarmModalTitle from './AlarmModalText/AlarmModalTitle'
import AlarmModalContent from './AlarmModalText/AlarmModalContent'


const AlarmModalBackground = styled(ModalBackground)({
  backgroundColor: 'rgba(255, 95, 87, 0.3)',
})


const AlarmModalContentBox = styled(ModalContentBox)({
  padding: '40px 60px',
  borderRadius: '19px',
  backgroundColor: '#FF5F57',
  width: '500px',
  minHeight: '221px',
})


const MessageBox = styled(Box)({
  width: '380px',
  minHeight: '141px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  color: 'white',
})


function AlarmModal() {
  const open = AlarmModalDataStore(state => state.open)
  const setOpen = AlarmModalDataStore(state => state.setOpen)
  const title = AlarmModalDataStore(state => state.title)
  const content = AlarmModalDataStore(state => state.content)

  return (
    <AlarmModalBackground
      open={open}
      onClose={setOpen}
    >
      <AlarmModalContentBox>
        <MessageBox>
          <ErrorOutline sx={{
            width: '42px',
            height: '42px',
          }} />
          <AlarmModalTitle>
            {title}
          </AlarmModalTitle>
          <AlarmModalContent>
            {content}
          </AlarmModalContent>
        </MessageBox>
        <ModalCloseButton
          size='14px'
          position='25px'
          color='white'
          onClick={setOpen}
        />
      </AlarmModalContentBox>
    </AlarmModalBackground>
  )
}

export default AlarmModal
