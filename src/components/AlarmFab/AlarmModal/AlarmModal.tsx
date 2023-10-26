import React from 'react'
import AlarmModalDataStore from 'store/AlarmModalDataStore'
import Box from '@mui/material/Box'
import ModalBackground from 'components/ModalBackground/ModalBackground'


const AlarmModal = () => {
  const open = AlarmModalDataStore(state => state.open)
  const setOpen = AlarmModalDataStore(state => state.setOpen)

  return (
    <ModalBackground
      open={open}
      onClose={setOpen}
    >
      <Box>

      </Box>
    </ModalBackground>
  )
}

export default AlarmModal
