interface TableHeader<TableDataType> {
  key: keyof TableDataType
  size: string
  setFilterData?: (newFilterData: string) => void
}

export default TableHeader
