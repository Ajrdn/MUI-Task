import React from 'react'
import dayjs from 'dayjs'
import { styled } from '@mui/material/styles'
import TableAddModalDataStore from 'store/TableAddModalDataStore'
import ModalBackground from 'components/ModalBackground/ModalBackground'
import ModalContentBox from 'components/ModalContentBox/ModalContentBox'
import ModalTitle from 'components/ModalTitle/ModalTitle'
import ModalCloseButton from 'components/ModalCloseButton/ModalCloseButton'
import TableAddForm from './TableAddForm/TableAddForm'


const TableAddModalContentBox = styled(ModalContentBox)({
  borderRadius: '25px',
  backgroundColor: 'white',
  width: '800px',
  height: '592px',
  padding: '60px 50px 70px',
})


const TableAddModalTitle = styled(ModalTitle)({
  marginBottom: '45px',
})


function TableAddModal() {
  const open = TableAddModalDataStore(state => state.open)
  const setOpen = TableAddModalDataStore(state => state.setOpen)
  const setWorkDate = TableAddModalDataStore(state => state.setWorkDate)
  const setLOTNo = TableAddModalDataStore(state => state.setLOTNo)
  const setVariety = TableAddModalDataStore(state => state.setVariety)
  const setStandard = TableAddModalDataStore(state => state.setStandard)
  const setLength = TableAddModalDataStore(state => state.setLength)
  const setWeight = TableAddModalDataStore(state => state.setWeight)

  const setClose = () => {
    setWorkDate(dayjs())
    setLOTNo('')
    setVariety('')
    setStandard('')
    setLength('')
    setWeight('')
    setOpen()
  }

  return (
    <ModalBackground
      open={open}
      onClose={setClose}
    >
      <TableAddModalContentBox>
        <TableAddModalTitle>
          용해절단 작업일지 추가
        </TableAddModalTitle>
        <TableAddForm />
        <ModalCloseButton
          size='30px'
          position='10px'
          color='#878787'
          backgroundColor='#F2F2F2'
          onClick={setClose}
        />
      </TableAddModalContentBox>
    </ModalBackground>
  )
}

export default TableAddModal
