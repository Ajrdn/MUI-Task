interface TableHeader {
  title: string
  size: string
  filterData?: string
  setFilterData?: (newFilterData: string) => void
}

export default TableHeader
