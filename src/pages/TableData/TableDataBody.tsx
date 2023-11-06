import React from 'react'
import TableBody from '@mui/material/TableBody'
import TableRowData from 'interface/TableRowData'
import TableDataRow from './TableDataRow'


interface TableDataBodyProps<TableDataType> {
  clickTableRow: (index: number) => void
  tableDataShowList: TableRowData<TableDataType>[]
}


function TableDataBody<TableDataType>(props: TableDataBodyProps<TableDataType>) {
  return (
    <TableBody>
      {props.tableDataShowList.map(taskDataShow => (
          <TableDataRow
            key={`${taskDataShow.index}`}
            tableRowData={taskDataShow.tableRowData}
            index={taskDataShow.index}
            selected={taskDataShow.selected}
            clickTableRow={props.clickTableRow}
          />
        ))}
    </TableBody>
  )
}

export default TableDataBody
