import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import FilterAlt from '@mui/icons-material/FilterAlt'
import IconButton from '@mui/material/IconButton'
import Modal from '@mui/material/Modal'
import TableDataFilterTextField from './TableDataFilterTextField'
import ModalContentBox from 'components/ModalContentBox/ModalContentBox'


const TableDataFilterModalBackground = styled(Modal)({
  '.MuiModal-backdrop': {
    backgroundColor: 'transparent',
  },
  position: 'absolute',
  left: '-50px',
})


const TableDataFilterModalContentBox = styled(ModalContentBox)({
  borderRadius: '4px',
  width: '150px',
  height: '50px',
  padding: '20px',
  backgroundColor: 'white',
  boxShadow: '0px 0px 5px #444',
  justifyContent: 'center',
})


function TableDataFilterButton() {
  const [open, setOpen] = useState<boolean>(false)

  const openChange = () => {
    setOpen(prev => !prev)
  }

  return (
    <>
      <IconButton onClick={openChange}>
        <FilterAlt
          sx={{
            width: '14px',
            height: '14px',
          }}
        />
      </IconButton>
      <TableDataFilterModalBackground
        open={open}
        onClose={openChange}
        disablePortal
      >
        <TableDataFilterModalContentBox>
          <TableDataFilterTextField />
        </TableDataFilterModalContentBox>
      </TableDataFilterModalBackground>
    </>
  )
}

export default TableDataFilterButton
