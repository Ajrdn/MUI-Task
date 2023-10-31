import { TaskDataServer } from './TaskData'


interface TableTaskDataRow {
  index: number
  selected: boolean
  taskData: TaskDataServer
}

export default TableTaskDataRow
