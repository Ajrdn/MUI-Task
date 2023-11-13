import React from 'react'
import TableBody from '@mui/material/TableBody'
import TableRowData from 'interface/TableRowData'
import TableDataRow from './TableDataRow'


interface TableDataBodyProps<TableDataType> {
  clickTableRow?: (index: number) => void
  tableDataShowList: TableRowData<TableDataType>[]
  no?: boolean
  copyFunction?: (tableData: TableDataType) => Promise<void>
  modifyFunction?: (tableData: TableDataType) => Promise<void>
  deleteFunction?: (tableData: TableDataType) => Promise<void>
}


function TableDataBody<TableDataType>(props: TableDataBodyProps<TableDataType>) {
  return (
    <TableBody>
      {props.tableDataShowList.map(taskDataShow => (
          <TableDataRow<TableDataType>
            key={taskDataShow.index}
            tableRowData={taskDataShow}
            no={props.no}
            clickTableRow={props.clickTableRow}
            copyFunction={props.copyFunction}
            modifyFunction={props.modifyFunction}
            deleteFunction={props.deleteFunction}
          />
        ))}
    </TableBody>
  )
}

export default TableDataBody
