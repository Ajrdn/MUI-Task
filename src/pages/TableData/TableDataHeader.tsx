import React from 'react'
import { styled } from '@mui/material/styles'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableDataFilterButton from './TableDataFilterButton'
import TableHeader from 'interface/TableHeader'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'


const TableHeaderTitle = styled(Typography)({
  color: '#13243A',
  fontSize: '13px',
  fontFamily: 'Pretendard',
  fontWeight: 600,
  textAlign: 'center',
})


const TableDataCell = styled(Box)({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '5px',
})


interface TableDataHeaderProps {
  tableHeaderList: TableHeader[]
  filterFunction: () => void
  copy?: boolean
  modify?: boolean
  delete?: boolean
}


function TableDataHeader(props: TableDataHeaderProps) {
  return (
    <TableHead>
      <TableRow>
        {props.tableHeaderList.map(tableHeader => (
          <TableCell
            key={tableHeader.title}
            align='center'
            sx={{
              width: tableHeader.size,
              height: '64px',
            }}
          >
            <TableDataCell>
              <TableHeaderTitle>{tableHeader.title}</TableHeaderTitle>
              {tableHeader.setFilterData &&
              <TableDataFilterButton
                filterData={tableHeader.filterData!}
                setFilterData={tableHeader.setFilterData}
                filterFunction={props.filterFunction}
                top={tableHeader.top!}
                left={tableHeader.left!}
              />}
            </TableDataCell>
          </TableCell>
        ))}
        {props.copy &&
        <TableCell
          align='center'
          sx={{
            width: '64px',
          }}
        >
          <TableHeaderTitle>복제</TableHeaderTitle>
        </TableCell>
        }
        {props.modify &&
        <TableCell
          align='center'
          sx={{
            width: '64px',
          }}
        >
          <TableHeaderTitle>수정</TableHeaderTitle>
        </TableCell>
        }
        {props.delete &&
        <TableCell
          align='center'
          sx={{
            width: '64px',
          }}
        >
          <TableHeaderTitle>삭제</TableHeaderTitle>
        </TableCell>
        }
      </TableRow>
    </TableHead>
  )
}

export default TableDataHeader
