interface TableRowData<TableDataType> {
  index: number
  selected: boolean
  tableData: TableDataType
  tableRowData: string[]
}

export default TableRowData
