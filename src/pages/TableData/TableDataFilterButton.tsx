import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import FilterAlt from '@mui/icons-material/FilterAlt'
import IconButton from '@mui/material/IconButton'
import Modal from '@mui/material/Modal'
import TableDataFilterTextField from './TableDataFilterTextField'
import ModalContentBox from 'components/ModalContentBox/ModalContentBox'


interface TableDataFilterModalBackgroundProps {
  top: string
  left: string
}


const TableDataFilterModalBackground = styled(Modal)<TableDataFilterModalBackgroundProps>(({ top, left }) => ({
  '.MuiModal-backdrop': {
    backgroundColor: 'transparent',
  },
  top: top,
  left: left,
  position: 'absolute',
}))


const TableDataFilterModalContentBox = styled(ModalContentBox)({
  borderRaius: '4px',
  width: '209px',
  height: '61px',
  padding: '16px 12px 7px',
  backgroundColor: 'white',
  boxShadow: '0px 0px 5px #444',
  justifyContent: 'center',
})


interface TableDataFilterButtonProps {
  filterData: string
  setFilterData: (newFilterData: string) => void
  filterFunction: () => void
  top: string
  left: string
}


function TableDataFilterButton(props: TableDataFilterButtonProps) {
  const [open, setOpen] = useState<boolean>(false)

  const openFilterField = () => {
    setOpen(prev => !prev)
  }

  const closeFilterField = () => {
    setOpen(prev => !prev)
    props.filterFunction()
  }

  return (
    <>
      <IconButton onClick={openFilterField}>
        <FilterAlt
          sx={{
            width: '14px',
            height: '14px',
          }}
        />
      </IconButton>
      <TableDataFilterModalBackground
        open={open}
        onClose={closeFilterField}
        top={props.top}
        left={props.left}
      >
        <TableDataFilterModalContentBox>
          <TableDataFilterTextField
            filterData={props.filterData}
            setFilterData={props.setFilterData}
          />
        </TableDataFilterModalContentBox>
      </TableDataFilterModalBackground>
    </>
  )
}

export default TableDataFilterButton
