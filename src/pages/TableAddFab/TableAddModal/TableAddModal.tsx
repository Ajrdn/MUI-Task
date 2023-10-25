import React from 'react'
import InformDataStore from 'store/InformDataStore'
import ModalBackground from 'components/ModalBackground/ModalBackground'
import Box from '@mui/material/Box'


const TableAddModal = () => {
  const open = InformDataStore(state => state.open)
  const setOpen = InformDataStore(state => state.setOpen)


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

export default TableAddModal
