interface TableHeader {
  title: string
  size: string
  filterData?: string
  filterFunction?: (newFilterData: string) => void
}

export default TableHeader
