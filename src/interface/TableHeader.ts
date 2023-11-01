interface TableHeader {
  title: string
  size: string
  filterFunction?: (filterData: string, filterFunction: (newData: string) => void) => void
}

export default TableHeader
