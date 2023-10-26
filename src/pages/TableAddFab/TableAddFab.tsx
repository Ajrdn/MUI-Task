import React from 'react'
import TableAddModalDataStore from 'store/TableAddModalDataStore'
import Fab from '@mui/material/Fab'
import Add from '@mui/icons-material/Add'
import TableAddModal from './TableAddModal/TableAddModal'


const TableAddFab = () => {
  const setOpen = TableAddModalDataStore(state => state.setOpen)

  return (
    <>
      <Fab
        onClick={setOpen}
        sx={{
          bgcolor: '#13243A',
          position: 'absolute',
          right: '30px',
          bottom: '200px',
          boxShadow: '0px 5px 6px #00000061',
          '&:hover': {
            backgroundColor: '#13243A',
          }
        }}
      >
        <Add
          sx={{
            color: 'white',
          }}
        />
      </Fab>
      <TableAddModal />
    </>
  )
}

export default TableAddFab
