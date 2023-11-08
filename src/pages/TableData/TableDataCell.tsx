import React from 'react'
import { styled } from '@mui/material/styles'
import TableCell from '@mui/material/TableCell'
import TextField from '@mui/material/TextField'


interface TableDataCellBoxProps {
  selected: boolean
}


const TableDataCellBox = styled(TableCell)<TableDataCellBoxProps>(({ selected }) => ({
  color: '#13243A',
  fontSize: '13px',
  fontFamily: 'Pretendard',
  fontWeight: 400,
  backgroundColor: selected ? '#E8E8E8' : 'white',
}))


interface TableDataCellProps {
  data: string
  selected: boolean
  selectCell: () => void
  openModify: boolean
}


function TableDataCell(props: TableDataCellProps) {
  return (
    <TableDataCellBox
      align='center'
      selected={props.selected}
      onClick={props.selectCell}
    >
      {props.openModify ?
      <TextField
        value={props.data}
      />
      : props.data}
    </TableDataCellBox>
  )
}

export default TableDataCell
