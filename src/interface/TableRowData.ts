interface TableRowData<TableDataType> {
  index: number
  selected: boolean
  tableData: TableDataType
  tableRowStringData: string[]
}

export default TableRowData
