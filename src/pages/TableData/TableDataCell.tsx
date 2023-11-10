import React, { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles'
import TableCell from '@mui/material/TableCell'
import TextField from '@mui/material/TextField'


const ModifyTextField = styled(TextField)({
  '.MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  '& .MuiInputBase-root': {
    backgroundColor: '#F2F2F2',
  },
  '& input': {
    border: 'none',
    color: '#13243A',
    fontSize: '13px',
    fontFamily: 'Pretendard',
    fontWeight: 400,
    textAlign: 'center',
  },
})


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


interface TableDataCellProps<TableDataType> {
  data: string
  dataKey?: keyof TableDataType
  modifyFunction: (newData: string, key: keyof TableDataType) => void
  selected: boolean
  selectCell?: () => void
  openModify: boolean
}


function TableDataCell<TableDataType>(props: TableDataCellProps<TableDataType>) {
  const [data, setData] = useState<string>(props.data)

  useEffect(() => {
    setData(props.data)
  }, [props.data])

  const dataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData(event.target.value)
    props.modifyFunction(event.target.value, props.dataKey!)
  }

  return (
    <TableDataCellBox
      align='center'
      selected={props.selected}
      onClick={props.selectCell}
    >
      {props.openModify && props.dataKey ?
      <ModifyTextField
        value={data}
        onChange={dataChange}
      />
      : data}
    </TableDataCellBox>
  )
}

export default TableDataCell
