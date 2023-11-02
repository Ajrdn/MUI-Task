import React, { useState } from 'react'
import TaskDataListStore from 'store/TaskDataListStore'
import TableHeaderFilterStore from 'store/TableHeaderFilterStore'
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


interface TableDataFilterButtonProps {
  filterData: string
  filterFunction: (newFilterData: string) => void
}


function TableDataFilterButton(props: TableDataFilterButtonProps) {
  const [open, setOpen] = useState<boolean>(false)

  const {
    lotNo,
    variety,
    standard,
    length,
    weight,
  } = TableHeaderFilterStore()

  const setTaskDataShowListByFilter = TaskDataListStore(state => state.setTaskDataShowListByFilter)

  const openFilterField = () => {
    setOpen(prev => !prev)
  }

  const closeFilterField = () => {
    setOpen(prev => !prev)
    setTaskDataShowListByFilter(lotNo, variety, standard, length, weight)
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
        disablePortal
      >
        <TableDataFilterModalContentBox>
          <TableDataFilterTextField {...props} />
        </TableDataFilterModalContentBox>
      </TableDataFilterModalBackground>
    </>
  )
}

export default TableDataFilterButton
