import { create } from 'zustand'
import TaskDataRow from 'interface/TaskDataRow'


interface TableDataCopyState {
  TaskDataRowCopyList: TaskDataRow[]
  TaskDataRowPasteList: TaskDataRow[]
}


const TableDataCopyStore = create<TableDataCopyState>(set => ({
  TaskDataRowCopyList: [],
  TaskDataRowPasteList: [],
}))

export default TableDataCopyStore
