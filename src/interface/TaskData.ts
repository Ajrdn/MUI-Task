import { Dayjs } from 'dayjs'

interface TaskData {
  workDate: Dayjs
  LOTNo: string
  variety: string
  standard: string
  length: number
  weight: number
}

export default TaskData
