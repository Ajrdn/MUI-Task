interface TableHeader<TableDataType> {
  key: keyof TableDataType
  size: string
  filterData?: string
  setFilterData?: (newFilterData: string) => void
}

export default TableHeader
