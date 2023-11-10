interface TableHeader<TableDataType> {
  title: keyof TableDataType
  size: string
  setFilterData?: (newFilterData: string) => void
}

export default TableHeader
