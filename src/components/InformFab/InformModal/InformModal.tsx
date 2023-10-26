import React from 'react'
import InformDataStore from 'store/InformModalDataStore'
import { styled } from '@mui/material/styles'
import ModalBackground from 'components/ModalBackground/ModalBackground'
import ModalContentBox from 'components/ModalContentBox/ModalContentBox'
import ModalCloseButton from 'components/ModalCloseButton/ModalCloseButton'
import ModalTitle from 'components/ModalTitle/ModalTitle'
import TitleField from './TitleField/TitleField'
import ContentField from './ContentField/ContentField'
import BottomField from './BottomField/BottomField'


const InformModalContentBox = styled(ModalContentBox)({
  borderRadius: '25px',
  backgroundColor: 'white',
  width: '800px',
  height: '592px',
  padding: '60px 50px 70px',
})


const InformModalTitle = styled(ModalTitle)({
  marginBottom: '40px',
})


function InformModal() {
  const open = InformDataStore(state => state.open)
  const setOpen = InformDataStore(state => state.setOpen)
  const setTitle = InformDataStore(state => state.setTitle)
  const setContent = InformDataStore(state => state.setContent)
  const setTarget = InformDataStore(state => state.setTarget)

  const setClose = () => {
    setTitle('')
    setContent('')
    setTarget('')
    setOpen()
  }

  return (
    <ModalBackground
      open={open}
      onClose={setClose}
    >
      <InformModalContentBox>
        <InformModalTitle>
          알림 보내기
        </InformModalTitle>
        <TitleField />
        <ContentField />
        <BottomField />
        <ModalCloseButton
          size='30px'
          position='10px'
          color='#878787'
          backgroundColor='#EFEFEF'
          onClick={setClose}
        />
      </InformModalContentBox>
    </ModalBackground>
  )
}

export default InformModal
