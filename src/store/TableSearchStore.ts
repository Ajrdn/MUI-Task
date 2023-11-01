import { create } from 'zustand'
import dayjs, { Dayjs } from 'dayjs'
import { MenuTitle } from 'interface/SearchMenu'


interface TableSearchState {
  menuList: MenuTitle[]
  searchDate: Dayjs
  searchItem: MenuTitle
  searchWord: string
  searchDetailItem: MenuTitle
  searchDetailWord: string

  setSearchDate: (date: Dayjs) => void

  setSearchItem: (item: MenuTitle) => void

  setSearchWord: (word: string) => void

  setSearchDetailItem: (detailItem: MenuTitle) => void

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
  searchDate: dayjs(),
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
