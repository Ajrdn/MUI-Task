import React from 'react'
import { styled } from '@mui/material/styles'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import TableHeader from 'interface/TableHeader'
import TableDataFilterButton from './TableDataFilterButton'


const TableHeaderTitle = styled(Typography)({
  color: '#13243A',
  fontSize: '13px',
  fontFamily: 'Pretendard',
  fontWeight: 600,
  textAlign: 'center',
})


interface TableCellBoxProps {
  width: string
}


const TableCellBox = styled(TableCell)<TableCellBoxProps>(({ width }) => ({
  width: width,
  height: '64px',
}))


const TableDataCell = styled(Box)({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '5px',
})


interface TableDataHeaderProps {
  tableHeaderList: TableHeader[]
  copy?: boolean
  modify?: boolean
  delete?: boolean
}


function TableDataHeader(props: TableDataHeaderProps) {
  return (
    <TableHead>
      <TableRow>
        {props.tableHeaderList.map(tableHeader => (
          <TableCellBox
            key={tableHeader.title}
            width={tableHeader.size}
            align='center'
          >
            <TableDataCell>
              <TableHeaderTitle>{tableHeader.title}</TableHeaderTitle>
              {tableHeader.setFilterData &&
              <TableDataFilterButton
                setFilterData={tableHeader.setFilterData}
              />}
            </TableDataCell>
          </TableCellBox>
        ))}
        {props.copy &&
        <TableCellBox
          width='64px'
          align='center'
        >
          <TableHeaderTitle>복제</TableHeaderTitle>
        </TableCellBox>
        }
        {props.modify &&
        <TableCellBox
          width='64px'
          align='center'
        >
          <TableHeaderTitle>수정</TableHeaderTitle>
        </TableCellBox>
        }
        {props.delete &&
        <TableCellBox
          width='64px'
          align='center'
        >
          <TableHeaderTitle>삭제</TableHeaderTitle>
        </TableCellBox>
        }
      </TableRow>
    </TableHead>
  )
}

export default TableDataHeader
