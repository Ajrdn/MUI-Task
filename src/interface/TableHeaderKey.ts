interface TableHeaderKey<TableDataType> {
  key: keyof TableDataType
  isThereKey: boolean
}

export default TableHeaderKey
