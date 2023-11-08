import TableRowStringData from './TableRowStringData'


interface TableRowData<TableDataType> {
  index: number
  selected: boolean
  tableData: TableDataType
  tableRowStringData: TableRowStringData<TableDataType>[]
}

export default TableRowData
