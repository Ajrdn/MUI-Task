import { create } from 'zustand'
import dayjs, { Dayjs } from 'dayjs'
import SearchMenu from 'interface/SelectMenu'


interface TableSearchState {
  searchDate: Dayjs
  searchItem: SearchMenu
  searchWord: string
  searchDetailItem: SearchMenu
  searchDetailWord: string

  setSearchDate: (date: Dayjs) => void

  setSearchItem: (item: SearchMenu) => void
  
  setSearchWord: (word: string) => void
  
  setSearchDetailItem: (detailItem: SearchMenu) => void
  
  setSearchDetailWord: (detailWord: string) => void
}


const TableSearchStore = create<TableSearchState>(set => ({
  searchDate: dayjs('2023-10-24'),
  searchItem: '전체',
  searchWord: '',
  searchDetailItem: '전체',
  searchDetailWord: '',

  setSearchDate: date => set(state => ({ searchDate: date })),
  
  setSearchItem: item => set(state => ({ searchItem: item })),
  
  setSearchWord: word => set(state => ({ searchWord: word })),
  
  setSearchDetailItem: detailItem => set(state => ({ searchDetailItem: detailItem })),
  
  setSearchDetailWord: detailWord => set(state => ({ searchDetailWord: detailWord })),
}))

export default TableSearchStore
