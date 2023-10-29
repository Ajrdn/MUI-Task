import { Dayjs } from 'dayjs'

export interface TaskDataClient {
  workDate: Dayjs
  lotNo: string
  variety: string
  standard: string
  length: string
  weight: string
}

export interface TaskDataServer {
  workDate: string
  lotNo: string
  variety: string
  standard: string
  length: string
  weight: string
}
