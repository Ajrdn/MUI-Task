import { create } from 'zustand'
import dayjs, { Dayjs } from 'dayjs'


interface TableSearchState {
  searchDate: Dayjs | null
  searchItem: string
  searchWord: string
  searchDetailItem: string
  searchDetailWord: string

  setSearchDate: (date: Dayjs | null) => void

  setSearchItem: (item: string) => void
  
  setSearchWord: (word: string) => void
  
  setSearchDetailItem: (detailItem: string) => void
  
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
