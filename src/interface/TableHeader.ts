export interface TableHeader {
  title: string
  size: string
  filterFunction?: (filterData: string, filterFunction: (newData: string) => void) => void
}

export const TABLE_HEADER_LIST: string[] = [
  'No.',
  '작업일',
  'LOT No.',
  '품종',
  '규격',
  '슬라브 길이',
  '중량',
];
