import React from 'react'
import TableBody from '@mui/material/TableBody'
import TableRowData from 'interface/TableRowData'
import TableDataRow from './TableDataRow'


interface TableDataBodyProps<TableDataType> {
  clickTableRow: (index: number) => void
  tableDataShowList: TableRowData<TableDataType>[]
  setTableDataDateList: (newTableDataDateList: TableDataType[]) => void
  copy?: boolean
  copyUrl?: string
  copyMethod?: string
  modify?: boolean
  modifyUrl?: string
  modifyMethod?: string
  delete?: boolean
  deleteUrl?: string
  deleteMethod?: string
}


function TableDataBody<TableDataType>(props: TableDataBodyProps<TableDataType>) {
  return (
    <TableBody>
      {props.tableDataShowList.map(taskDataShow => (
          <TableDataRow<TableDataType>
            key={taskDataShow.index}
            tableRowData={taskDataShow}
            clickTableRow={props.clickTableRow}
            setTableDataDateList={props.setTableDataDateList}
            copy={props.copy}
            copyUrl={props.copyUrl}
            copyMethod={props.copyMethod}
            modify={props.modify}
            modifyUrl={props.modifyUrl}
            modifyMethod={props.modifyMethod}
            delete={props.delete}
            deleteUrl={props.deleteUrl}
            deleteMethod={props.deleteMethod}
          />
        ))}
    </TableBody>
  )
}

export default TableDataBody
