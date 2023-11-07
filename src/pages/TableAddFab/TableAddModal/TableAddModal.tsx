import React, { useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { styled } from '@mui/material/styles'
import MeltingTableData from 'interface/MeltingTableData'
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


interface TableAddModalProps {
  open: boolean
  setOpen: (newOpen: boolean) => void
  setMeltingTableDataList: (newMeltingTableDataList: MeltingTableData[]) => void
}


function TableAddModal(props: TableAddModalProps) {
  const [workDate, setWorkDate] = useState<Dayjs>(dayjs())
  const [lotNo, setLotNo] = useState<string>('')
  const [variety, setVariety] = useState<string>('')
  const [standard, setStandard] = useState<string>('')
  const [length, setLength] = useState<string>('')
  const [weight, setWeight] = useState<string>('')

  const setClose = () => {
    setWorkDate(dayjs())
    setLotNo('')
    setVariety('')
    setStandard('')
    setLength('')
    setWeight('')
    props.setOpen(false)
  }

  return (
    <ModalBackground
      open={props.open}
      onClose={setClose}
    >
      <TableAddModalContentBox>
        <TableAddModalTitle>
          용해절단 작업일지 추가
        </TableAddModalTitle>
        <TableAddForm
          setMeltingTableDataList={props.setMeltingTableDataList}
          setOpen={props.setOpen}
          workDate={workDate}
          lotNo={lotNo}
          variety={variety}
          standard={standard}
          length={length}
          weight={weight}
          setWorkDate={setWorkDate}
          setLotNo={setLotNo}
          setVariety={setVariety}
          setStandard={setStandard}
          setLength={setLength}
          setWeight={setWeight}
        />
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
