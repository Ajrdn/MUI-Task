import React from 'react'
import TableBody from '@mui/material/TableBody'
import TableRowData from 'interface/TableRowData'
import TableDataRow from './TableDataRow'


interface TableDataBodyProps<TableDataType> {
  clickTableRow: (index: number) => void
  tableDataShowList: TableRowData<TableDataType>[]
  setTableDataDateList: (newTableDataDateList: TableDataType[]) => void
  copy?: boolean
  modify?: boolean
  delete?: boolean
}


function TableDataBody<TableDataType>(props: TableDataBodyProps<TableDataType>) {
  return (
    <TableBody>
      {props.tableDataShowList.map(taskDataShow => (
          <TableDataRow<TableDataType>
            key={`${taskDataShow.index}`}
            tableRowData={taskDataShow}
            clickTableRow={props.clickTableRow}
            setTableDataDateList={props.setTableDataDateList}
            copy={props.copy}
            modify={props.modify}
            delete={props.delete}
          />
        ))}
    </TableBody>
  )
}

export default TableDataBody
