import { create } from 'zustand'
import TableTaskDataRow from 'interface/TableTaskDataRow'


interface TableDataCopyState {
  taskDataRowCopyList: TableTaskDataRow[]
  taskDataRowPasteList: TableTaskDataRow[]

  addTaskDataRowCopyList: (taskDataRow: TableTaskDataRow) => void

  selectTaskDataRowCopyList: (index: number) => void

  unselectTaskDataRowCopyList: (index: number) => void

  clearTaskDataRowCopyList: () => void

  setTaskDataRowPasteList: () => void
}


const TableDataCopyStore = create<TableDataCopyState>(set => ({
  taskDataRowCopyList: [],
  taskDataRowPasteList: [],

  addTaskDataRowCopyList: taskDataRow => set(state => ({taskDataRowCopyList: [...state.taskDataRowCopyList, taskDataRow]})),

  selectTaskDataRowCopyList: index => set(state => ({taskDataRowCopyList: state.taskDataRowCopyList.map(taskDataRow => {
    console.log(state.taskDataRowCopyList)
    if(index === taskDataRow.index) return {
      ...taskDataRow,
      selected: true,
    }
    return taskDataRow
  })})),

  unselectTaskDataRowCopyList: index => set(state => ({taskDataRowCopyList: state.taskDataRowCopyList.map(taskDataRow => {
    if(index === taskDataRow.index) return {
      ...taskDataRow,
      selected: false,
    }
    return taskDataRow
  })})),

  clearTaskDataRowCopyList: () => set(state => ({taskDataRowCopyList: []})),

  setTaskDataRowPasteList: () => set(state => ({
    taskDataRowPasteList: state.taskDataRowCopyList,
    taskDataRowCopyList: [],
  })),
}))

export default TableDataCopyStore
