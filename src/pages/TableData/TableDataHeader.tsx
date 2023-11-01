import React from 'react'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableDataFilterButton from './TableDataFilterButton'
import { TABLE_HEADER_LIST } from 'interface/TableHeader'


function TableDataHeader() {
  return (
    <TableHead>
      <TableRow>
        {TABLE_HEADER_LIST.map(tableHeader => (
          <TableCell
            key={tableHeader.title}
            align='center'
            sx={{
              width: tableHeader.size,
              height: '64px',
              color: '#13243A',
              fontSize: '13px',
              fontFamily: 'Pretendard',
              fontWeight: 600,
              textAlign: 'center',
            }}
          >
            {tableHeader.title}
            {tableHeader.filterFunction &&
            <TableDataFilterButton />}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export default TableDataHeader
