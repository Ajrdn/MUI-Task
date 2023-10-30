import { Dayjs } from 'dayjs'


interface TaskDataRow {
  index: string
  workDate: Dayjs
  lotNo: string
  variety: string
  standard: string
  length: string
  weight: string
}

export default TaskDataRow
