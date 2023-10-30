import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'


interface TableDataCellProps {
  selected: boolean
}


const TableDataCell = styled(TableCell)<TableDataCellProps>(({ selected }) => ({
  color: '#13243A',
  fontSize: '13px',
  fontFamily: 'Pretendard',
  fontWeight: 400,
  textAlign: 'center',
  backgroundColor: selected ? '#626262' : 'white',
}))


interface TableDataRowProps {
  cellDataList: string[]
}


function TableDataRow(props: TableDataRowProps) {
  const [selected, setSelected] = useState<boolean>(false)

  return (
    <TableRow
      onClick={() => setSelected(prev => !prev)}
      sx={{
        '&:last-child > *': {
          borderBottom: 'none',
        },
      }}
    >
      {props.cellDataList.map(cellData => (
        <TableDataCell
          key={cellData}
          align='center'
          selected={selected}
        >
          {cellData}
        </TableDataCell>
      ))}
    </TableRow>
  )
}

export default TableDataRow
