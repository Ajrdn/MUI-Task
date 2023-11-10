import React from 'react'
import TableBody from '@mui/material/TableBody'
import TableRowData from 'interface/TableRowData'
import TableDataRow from './TableDataRow'


interface TableDataBodyProps<TableDataType> {
  clickTableRow?: (index: number) => void
  tableDataShowList: TableRowData<TableDataType>[]
  setTableDataDateList: (newTableDataDateList: TableDataType[]) => void
  no?: boolean
  copyUrl?: string
  copyMethod?: string
  modifyUrl?: string
  modifyMethod?: string
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
            no={props.no}
            clickTableRow={props.clickTableRow}
            setTableDataDateList={props.setTableDataDateList}
            copyUrl={props.copyUrl}
            copyMethod={props.copyMethod}
            modifyUrl={props.modifyUrl}
            modifyMethod={props.modifyMethod}
            deleteUrl={props.deleteUrl}
            deleteMethod={props.deleteMethod}
          />
        ))}
    </TableBody>
  )
}

export default TableDataBody
