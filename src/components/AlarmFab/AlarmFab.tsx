import React from 'react'
import Fab from '@mui/material/Fab'
import Alarm from '@mui/icons-material/Alarm'
import AlarmModal from './AlarmModal/AlarmModal'

const AlarmFab = () => {
  return (
    <>
      <Fab
        sx={{
          bgcolor: 'red',
          position: 'absolute',
          right: '30px',
          bottom: '10px',
          boxShadow: '0px 5px 6px #00000061',
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
