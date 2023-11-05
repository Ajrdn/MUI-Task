interface TableRowData<T> {
  index: number
  selected: boolean
  tableData: T
  tableRowData: string[]
}

export default TableRowData
