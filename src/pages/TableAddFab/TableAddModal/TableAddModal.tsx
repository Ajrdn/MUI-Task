import React from 'react'
import TableAddModalDataStore from 'store/TableAddModalDataStore'
import ModalBackground from 'components/ModalBackground/ModalBackground'
import Box from '@mui/material/Box'


const TableAddModal = () => {
  const open = TableAddModalDataStore(state => state.open)
  const setOpen = TableAddModalDataStore(state => state.setOpen)

  return (
    <ModalBackground
      open={open}
      onClose={setOpen}
    >
      <Box></Box>
    </ModalBackground>
  )
}

export default TableAddModal
