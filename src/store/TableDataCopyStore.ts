import { create } from 'zustand'
import TableTaskDataRow from 'interface/TableTaskDataRow'
import { TaskDataServer } from 'interface/TaskData'


interface TableDataCopyState {
  tableTaskDataRowCopyList: TableTaskDataRow[]
  tableTaskDataRowPasteList: TaskDataServer[]

  addTableTaskDataRowCopyList: (tableTaskDataRow: TableTaskDataRow) => void

  clickTableTaskDataRow: (index: number) => void

  clearTableTaskDataRowCopyList: () => void

  setTableTaskDataRowPasteList: () => void
}


const TableDataCopyStore = create<TableDataCopyState>(set => ({
  tableTaskDataRowCopyList: [],
  tableTaskDataRowPasteList: [],

  addTableTaskDataRowCopyList: tableTaskDataRow => set(state => ({tableTaskDataRowCopyList: [...state.tableTaskDataRowCopyList, tableTaskDataRow]})),

  clickTableTaskDataRow: index => set(state => ({tableTaskDataRowCopyList: state.tableTaskDataRowCopyList.map(tableTaskDataRow => {
    if(index === tableTaskDataRow.index) return {
      ...tableTaskDataRow,
      selected: !tableTaskDataRow.selected,
    }
    return tableTaskDataRow
  })})),

  clearTableTaskDataRowCopyList: () => set(state => ({tableTaskDataRowCopyList: state.tableTaskDataRowCopyList.map(tableTaskDataRow => ({
    ...tableTaskDataRow,
    selected: false,
  }))})),

  setTableTaskDataRowPasteList: () => set(state => ({
    tableTaskDataRowPasteList: state.tableTaskDataRowCopyList.filter(tableTaskDataRow => tableTaskDataRow.selected).map(tableTaskDataRow => tableTaskDataRow.taskData),
    tableTaskDataRowCopyList: state.tableTaskDataRowCopyList.map(tableTaskDataRow => ({
      ...tableTaskDataRow,
      selected: false,
    })),
  })),
}))

export default TableDataCopyStore
