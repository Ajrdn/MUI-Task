import React from 'react'
import Fab from '@mui/material/Fab'
import Alarm from '@mui/icons-material/Alarm'
import InformDataStore from 'store/InformDataStore'
import InformModal from './InformModal/InformModal'


const InformFab = () => {
  const setOpen = InformDataStore(state => state.setOpen)

  return (
    <>
      <Fab
        onClick={setOpen}
        sx={{
          bgcolor: 'green',
          position: 'absolute',
          right: '30px',
          bottom: '100px',
          boxShadow: '0px 5px 6px #00000061',
        }}
      >
        <Alarm
          sx={{
            color: 'white',
          }}
        />
      </Fab>
      <InformModal />
    </>
  )
}

export default InformFab
