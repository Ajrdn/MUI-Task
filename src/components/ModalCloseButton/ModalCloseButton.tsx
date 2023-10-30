import React from 'react'
import IconButton from '@mui/material/IconButton'
import Clear from '@mui/icons-material/Clear'


interface ModalCloseButtonProps {
  size: string
  position: string
  color?: string
  backgroundColor?: string
  onClick: () => void
}


function ModalCloseButton(props: ModalCloseButtonProps) {
  return (
    <IconButton
      onClick={props.onClick}
      sx={{
        width: props.size,
        height: props.size,
        position: 'absolute',
        top: props.position,
        right: props.position,
        borderRadius: '50%',
        backgroundColor: props.backgroundColor,
      }}
    >
      <Clear
        sx={{
          color: props.color,
        }}
      />
    </IconButton>
  )
}

export default ModalCloseButton
