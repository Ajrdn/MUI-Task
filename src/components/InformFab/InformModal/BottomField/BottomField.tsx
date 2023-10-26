import React from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import BottomSelect from './BottomSelect'
import BottomButton from './BottomButton'


const BottomFieldBox = styled(Box)({
  width: '100%',
  height: '56px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
})


function BottomField() {
  return (
    <BottomFieldBox>
      <BottomSelect />
      <BottomButton />
    </BottomFieldBox>
  )
}

export default BottomField
