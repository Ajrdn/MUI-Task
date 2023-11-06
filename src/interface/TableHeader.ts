interface TableHeader {
  title: string
  size: string
  filterData?: string
  setFilterData?: (newFilterData: string) => void
  top?: string
  left?: string
}

export default TableHeader
