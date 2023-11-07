import React from 'react'
import { Dayjs } from 'dayjs'
import { styled } from '@mui/material/styles'
import FormControl from '@mui/material/FormControl'
import MeltingTableData from 'interface/MeltingTableData'
import TableAddFormField from './TableAddFormField'
import TableAddFormButton from './TableAddFormButton'


const TableAddFormControl = styled(FormControl)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
})


interface TableAddFormProps {
  setMeltingTableDataList: (newMeltingTableDataList: MeltingTableData[]) => void
  setOpen: (newOpen: boolean) => void
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


function TableAddForm(props: TableAddFormProps) {
  return (
    <TableAddFormControl>
      <TableAddFormField
        workDate={props.workDate}
        lotNo={props.lotNo}
        variety={props.variety}
        standard={props.standard}
        length={props.length}
        weight={props.weight}
        setWorkDate={props.setWorkDate}
        setLotNo={props.setLotNo}
        setVariety={props.setVariety}
        setStandard={props.setStandard}
        setLength={props.setLength}
        setWeight={props.setWeight}
      />
      <TableAddFormButton
        setMeltingTableDataList={props.setMeltingTableDataList}
        setOpen={props.setOpen}
        workDate={props.workDate}
        lotNo={props.lotNo}
        variety={props.variety}
        standard={props.standard}
        length={props.length}
        weight={props.weight}
        setWorkDate={props.setWorkDate}
        setLotNo={props.setLotNo}
        setVariety={props.setVariety}
        setStandard={props.setStandard}
        setLength={props.setLength}
        setWeight={props.setWeight}
      />
    </TableAddFormControl>
  )
}

export default TableAddForm
