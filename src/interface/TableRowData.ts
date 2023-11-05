interface TableRowData<T> {
  index: number
  selected: boolean
  tableData: T
  cellDataList: string[]
}

export default TableRowData
