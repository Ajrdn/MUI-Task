import { create } from 'zustand'
import TableTaskDataRow from 'interface/TableTaskDataRow'


interface TableDataCopyState {
  tableTaskDataRowCopyList: TableTaskDataRow[]
  tableTaskDataRowPasteList: TableTaskDataRow[]

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

  clearTableTaskDataRowCopyList: () => set(state => ({tableTaskDataRowCopyList: []})),

  setTableTaskDataRowPasteList: () => set(state => ({
    tableTaskDataRowPasteList: state.tableTaskDataRowCopyList.filter(tableTaskDataRow => tableTaskDataRow.selected),
    tableTaskDataRowCopyList: state.tableTaskDataRowCopyList.map(tableTaskDataRow => ({
      ...tableTaskDataRow,
      selected: false,
    })),
  })),
}))

export default TableDataCopyStore
