import { create } from 'zustand'
import dayjs, { Dayjs } from 'dayjs'


interface TableSearchState {
  searchDate: Dayjs

  setSearchDate: (date: Dayjs) => void
}


const TableSearchStore = create<TableSearchState>((set) => ({
  searchDate: dayjs(),

  setSearchDate: date => set(state => ({searchDate: date})),
}))

export default TableSearchStore
