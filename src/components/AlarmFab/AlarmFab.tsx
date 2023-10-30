import React from 'react'
import AlarmModalDataStore from 'store/AlarmModalDataStore'
import Fab from '@mui/material/Fab'
import Alarm from '@mui/icons-material/Alarm'
import AlarmModal from './AlarmModal/AlarmModal'


function AlarmFab() {
  const setOpen = AlarmModalDataStore(state => state.setOpen)

  return (
    <>
      <Fab
        onClick={setOpen}
        sx={{
          bgcolor: 'red',
          position: 'absolute',
          right: '30px',
          bottom: '10px',
          boxShadow: '0px 5px 6px #00000061',
          '&:hover': {
            backgroundColor: 'red',
          }
        }}
      >
        <Alarm
          sx={{
            color: 'white',
          }}
        />
      </Fab>
      <AlarmModal />
    </>
  )
}

export default AlarmFab
