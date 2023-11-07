import React from 'react'
import { Dayjs } from 'dayjs'
import { styled } from '@mui/material/styles'
import FormControl from '@mui/material/FormControl'
import TableAddDatePicker from './TableAddDatePicker'
import TableAddTextField from './TableAddTextField'


const TableAddFormFieldBox = styled(FormControl)({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: '45px 39px',
})


interface TableAddFormFieldProps {
  workDate: Dayjs
  lotNo: string
  variety: string
  standard: string
  length: string
  weight: string
  setWorkDate: (newWorkDate: Dayjs) => void
  setLotNo: (newLotNo: string) => void
  setVariety: (newVariety: string) => void
  setStandard: (newStandard: string) => void
  setLength: (newLength: string) => void
  setWeight: (newWeight: string) => void
}


function TableAddFormField(props: TableAddFormFieldProps) {
  const lotNoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setLotNo(event.target.value)
  }

  const varietyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setVariety(event.target.value)
  }

  const standardChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setStandard(event.target.value)
  }

  const lengthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setLength(event.target.value)
  }

  const weightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setWeight(event.target.value)
  }

  return (
    <TableAddFormFieldBox>
      <TableAddDatePicker
        date={props.workDate}
        setDate={props.setWorkDate}
      />
      <TableAddTextField
        label='LOT No.'
        value={props.lotNo}
        setValue={lotNoChange}
      />
      <TableAddTextField
        label='품종'
        value={props.variety}
        setValue={varietyChange}
      />
      <TableAddTextField
        label='규격'
        value={props.standard}
        setValue={standardChange}
      />
      <TableAddTextField
        label='수량'
        value={props.length}
        setValue={lengthChange}
      />
      <TableAddTextField
        label='중량'
        value={props.weight}
        setValue={weightChange}
      />
    </TableAddFormFieldBox>
  )
}

export default TableAddFormField
