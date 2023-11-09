import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import FilterAlt from '@mui/icons-material/FilterAlt'
import IconButton from '@mui/material/IconButton'
import Modal from '@mui/material/Modal'
import TableDataFilterTextField from './TableDataFilterTextField'
import ModalContentBox from 'components/ModalContentBox/ModalContentBox'


interface TableDataFilterModalBackgroundProps {
  top: number
  left: number
}


const TableDataFilterModalBackground = styled(Modal)<TableDataFilterModalBackgroundProps>(({ top, left }) => ({
  '.MuiModal-backdrop': {
    backgroundColor: 'transparent',
  },
  top: `${top}px`,
  left: `${left}px`,
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
}


function TableDataFilterButton(props: TableDataFilterButtonProps) {
  const [unchanged, setUnchanged] = useState<boolean>(true)
  const [open, setOpen] = useState<boolean>(false)
  const [top, setTop] = useState<number>(0)
  const [left, setLetf] = useState<number>(0)

  const openFilterField = (event: React.MouseEvent<HTMLElement>) => {
    setTop(event.currentTarget.getBoundingClientRect().top + 30)
    setLetf(event.currentTarget.getBoundingClientRect().left + 10)
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
        top={top}
        left={left}
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
