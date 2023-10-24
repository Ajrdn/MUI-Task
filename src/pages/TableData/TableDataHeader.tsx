import React from 'react'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'


const TableDataHeader = () => {
  const titles: string[] = [
    'No.',
    '작업일',
    'LOT No.',
    '품종',
    '규격',
    '슬라브 길이',
    '중량',
  ]

  return (
    <TableHead>
      <TableRow>
        {titles.map(title => <TableCell align='center'>{title}</TableCell>)}
      </TableRow>
    </TableHead>
  )
}

export default TableDataHeader
