import { TaskDataClient } from './TaskData'


interface TableTaskDataRow {
  index: number
  selected: boolean
  taskData: TaskDataClient
}

export default TableTaskDataRow
