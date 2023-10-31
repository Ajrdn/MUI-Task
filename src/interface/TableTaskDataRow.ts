import { Dayjs } from 'dayjs'


interface TableTaskDataRow {
  index: number
  workDate: Dayjs
  lotNo: string
  variety: string
  standard: string
  length: string
  weight: string
  selected: boolean
}

export default TableTaskDataRow
