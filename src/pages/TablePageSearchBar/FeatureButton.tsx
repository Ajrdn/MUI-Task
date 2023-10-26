import React from 'react'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'


interface FeatureButtonProps {
  feature: string
  variant: 'contained' | 'outlined' | 'text'
  color: string
  backgroundColor: string
  icon: React.ReactNode
  width: string
  padding: string
  label: boolean
  buttonPerformance?: () => void
  inputPerformance?: (event: React.ChangeEvent<HTMLInputElement>) => void
}


const FeatureButton = (props: FeatureButtonProps) => {
  return (
    <Button
      component={props.label ? 'label' : 'button'}
      variant={props.variant}
      startIcon={props.icon}
      onClick={props.buttonPerformance}
      sx={{
        width: props.width,
        height: '40px',
        bgcolor: props.variant === 'outlined' ? 'none' : props.backgroundColor,
        borderColor: props.variant === 'outlined' ? props.backgroundColor : 'none',
        color: props.color,
        boxShadow: 'none',
        p: props.padding,
      }}
    >
      <Typography sx={{
        fontSize: '14px',
        textAlign: 'left',
        fontFamily: 'Pretendard',
        fontWeight: 500,
      }}>
        {props.feature}
      </Typography>
      {props.label && <input hidden type='file' accept='.xlsx, .xls, .csv' onChange={props.inputPerformance} />}
    </Button>
  )
}

export default  FeatureButton
