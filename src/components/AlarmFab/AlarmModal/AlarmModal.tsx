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
  justifyContent: 'center',
  borderRadius: '19px',
  backgroundColor: '#FF5F57',
  width: '500px',
  height: '221px',
})


const MessageBox = styled(Box)({
  width: '380px',
  height: '141px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  color: 'white',
})


const AlarmModal = () => {
  const open = AlarmModalDataStore(state => state.open)
  const setOpen = AlarmModalDataStore(state => state.setOpen)

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
            작업 중단
          </AlarmModalTitle>
          <AlarmModalContent>
            현재 작업을 중단해주시기 바랍니다.
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
