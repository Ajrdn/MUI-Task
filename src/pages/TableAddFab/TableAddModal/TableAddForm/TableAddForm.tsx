import React from 'react'
import TableAddModalDataStore from 'store/TableAddModalDataStore'
import { styled } from '@mui/material/styles'
import FormControl from '@mui/material/FormControl'
import TableAddDatePicker from './TableAddDatePicker'
import TableAddTextField from './TableAddTextField'


const TableAddFormControl = styled(FormControl)({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: '45px 39px',
})


function TableAddForm() {
  const LOTNo = TableAddModalDataStore(state => state.LOTNo)
  const setLOTNo = TableAddModalDataStore(state => state.setLOTNo)
  
  const variety = TableAddModalDataStore(state => state.variety)
  const setVariety = TableAddModalDataStore(state => state.setVariety)
  
  const standard = TableAddModalDataStore(state => state.standard)
  const setStandard = TableAddModalDataStore(state => state.setStandard)
  
  const length = TableAddModalDataStore(state => state.length)
  const setLength = TableAddModalDataStore(state => state.setLength)
  
  const weight = TableAddModalDataStore(state => state.weight)
  const setWeight = TableAddModalDataStore(state => state.setWeight)

  const LOTNoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLOTNo(event.target.value)
  }

  const varietyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVariety(event.target.value)
  }

  const standardChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStandard(event.target.value)
  }

  const lengthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLength(event.target.value)
  }

  const weightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWeight(event.target.value)
  }

  return (
    <TableAddFormControl>
      <TableAddDatePicker />
      <TableAddTextField
        label='LOT No.'
        value={LOTNo}
        setValue={LOTNoChange}
      />
      <TableAddTextField
        label='품종'
        value={variety}
        setValue={varietyChange}
      />
      <TableAddTextField
        label='규격'
        value={standard}
        setValue={standardChange}
      />
      <TableAddTextField
        label='수량'
        value={length}
        setValue={lengthChange}
      />
      <TableAddTextField
        label='중량'
        value={weight}
        setValue={weightChange}
      />
    </TableAddFormControl>
  )
}

export default TableAddForm
