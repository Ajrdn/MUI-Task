import { create } from 'zustand'
import TableTaskDataRow from 'interface/TableTaskDataRow'
import TaskData from 'interface/TaskData'


interface TableDataCopyState {
  tableTaskDataRowCopyList: TableTaskDataRow[]
  tableTaskDataRowCopyListLength: number
  tableTaskDataRowPasteList: TaskData[]

  setTableTaskDataRowCopyList: (tableTaskDataRowList: TableTaskDataRow[]) => void

  clickTableTaskDataRow: (index: number) => void

  clearTableTaskDataRowCopyList: () => void

  setTableTaskDataRowPasteList: () => void
}


const TableDataCopyStore = create<TableDataCopyState>(set => ({
  tableTaskDataRowCopyList: [],
  tableTaskDataRowCopyListLength: 0,
  tableTaskDataRowPasteList: [],

  setTableTaskDataRowCopyList: tableTaskDataRowList => set({tableTaskDataRowCopyList: tableTaskDataRowList}),

  clickTableTaskDataRow: index => set(state => {
    const newTableTaskDataRowCopyList = state.tableTaskDataRowCopyList.map(tableTaskDataRow => {
      if(index === tableTaskDataRow.index) return {
        ...tableTaskDataRow,
        selected: !tableTaskDataRow.selected,
      }
      return tableTaskDataRow
    })
    return {
      tableTaskDataRowCopyList: newTableTaskDataRowCopyList,
      tableTaskDataRowCopyListLength: newTableTaskDataRowCopyList.filter(tableTaskDataRow => tableTaskDataRow.selected).length
    }
  }),

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
