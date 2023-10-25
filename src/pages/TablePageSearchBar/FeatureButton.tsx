import React from 'react'
import Button from '@mui/material/Button'


interface FeatureButtonProps {
  feature: string
  variant: 'contained' | 'outlined' | 'text'
  color: string
  backgroundColor: string
  icon: React.ReactNode
  width: string
  padding: string
  performance: () => void
}


const FeatureButton = (props: FeatureButtonProps) => {
  return (
    <Button
      variant={props.variant}
      startIcon={props.icon}
      onClick={props.performance}
      sx={{
        width: props.width,
        height: '40px',
        bgcolor: props.variant === 'outlined' ? 'none' : props.backgroundColor,
        borderColor: props.variant === 'outlined' ? props.backgroundColor : 'none',
        color: props.color,
        boxShadow: 'none',
        p: props.padding,
        fontSize: '15px',
        textAlign: 'left',
      }}
    >
      {props.feature}
    </Button>
  )
}

export default  FeatureButton
