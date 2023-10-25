import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import InformDataStore from 'store/InformDataStore'
import ModalBackground from 'components/ModalBackground/ModalBackground'


const InformModal = () => {
  const open = InformDataStore(state => state.open)
  const setOpen = InformDataStore(state => state.setOpen)

  return (
    <ModalBackground
      open={open}
      onClose={setOpen}
    >
      <Box sx={{ bgcolor: 'red' }}>
        <Typography id='modal-modal-title' variant='h6' component='h2'>
          Text in a modal
        </Typography>
        <Typography id='modal-modal-description' sx={{ mt: 2 }}>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </Typography>
      </Box>
    </ModalBackground>
  )
}

export default InformModal
