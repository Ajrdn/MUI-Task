import React from 'react'
import Fab from '@mui/material/Fab'
import Alarm from '@mui/icons-material/Alarm'


const InformFab = () => {
  return (
    <Fab sx={{
      bgcolor: 'green',
      position: 'absolute',
      right: '30px',
      bottom: '100px',
      boxShadow: '0px 5px 6px #00000061'
    }}>
      <Alarm sx={{
        color: 'white',
      }}/>
    </Fab>
  )
}

export default InformFab
