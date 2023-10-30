import { create } from 'zustand'
import TaskDataRow from 'interface/TaskDataRow'


interface TableDataCopyState {
  taskDataRowCopyList: TaskDataRow[]
  taskDataRowPasteList: TaskDataRow[]

  addTaskDataRowCopyList: (taskDataRow: TaskDataRow) => void

  deleteTaskDataRowCopyList: (index: string) => void

  clearTaskDataRowCopyList: () => void

  setTaskDataRowPasteList: () => void
}


const TableDataCopyStore = create<TableDataCopyState>(set => ({
  taskDataRowCopyList: [],
  taskDataRowPasteList: [],

  addTaskDataRowCopyList: taskDataRow => set(state => ({taskDataRowCopyList: [...state.taskDataRowCopyList, taskDataRow]})),

  deleteTaskDataRowCopyList: index => set(state => ({taskDataRowCopyList: state.taskDataRowCopyList.filter(taskDataRow => taskDataRow.index !== index)})),

  clearTaskDataRowCopyList: () => set(state => ({taskDataRowCopyList: []})),

  setTaskDataRowPasteList: () => set(state => ({
    taskDataRowPasteList: state.taskDataRowCopyList,
    taskDataRowCopyList: [],
  })),
}))

export default TableDataCopyStore
