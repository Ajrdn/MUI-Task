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
  const [unchanged, setUnchanged] = useState<boolean>(true)
  const [open, setOpen] = useState<boolean>(false)

  const openFilterField = () => {
    setOpen(prev => !prev)
  }

  const closeFilterField = () => {
    if(unchanged) props.setFilterData('')
    setOpen(prev => !prev)
    setUnchanged(true)
    props.filterFunction()
  }

  const filterDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUnchanged(false)
    props.setFilterData(event.target.value)
  }

  return (
    <>
      <IconButton onClick={openFilterField}>
        <FilterAlt
          sx={{
            width: '10px',
            height: '10px',
            color: '#13243A',
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
            setFilterData={filterDataChange}
          />
        </TableDataFilterModalContentBox>
      </TableDataFilterModalBackground>
    </>
  )
}

export default TableDataFilterButton
