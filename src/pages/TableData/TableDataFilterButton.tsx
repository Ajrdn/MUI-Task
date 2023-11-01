import React, { useState } from 'react'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import FilterAlt from '@mui/icons-material/FilterAlt'


function TableDataFilterButton() {
  const [open, setOpen] = useState<boolean>(false)

  const openChange = () => {
    setOpen(prev => !prev)
    console.log(open)
  }

  return (
    <IconButton onClick={openChange}>
      <FilterAlt />
      <Modal
        open={open}
        onClose={openChange}
      >
        <Box>
          test
        </Box>
      </Modal>
    </IconButton>
  )
}

export default TableDataFilterButton
