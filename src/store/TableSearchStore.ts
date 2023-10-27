import { create } from 'zustand'
import dayjs, { Dayjs } from 'dayjs'
import SearchMenu from 'interface/SearchMenu'


interface TableSearchState {
  menuList: SearchMenu[]
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


const TableSearchStore = create<TableSearchState>((set) => ({
  menuList: [
    '전체',
    'LOT No.',
    '품종',
    '규격',
    '슬라브 길이',
    '중량',
  ],
  searchDate: dayjs('2023-10-24'),
  searchItem: '전체',
  searchWord: '',
  searchDetailItem: '전체',
  searchDetailWord: '',

  setSearchDate: date => set(state => ({searchDate: date})),

  setSearchItem: item => set(state => ({searchItem: item})),

  setSearchWord: word => set(state => ({searchWord: word})),

  setSearchDetailItem: detailItem => set(state => ({searchDetailItem: detailItem})),

  setSearchDetailWord: detailWord => set(state => ({searchDetailWord: detailWord})),
}))

export default TableSearchStore
