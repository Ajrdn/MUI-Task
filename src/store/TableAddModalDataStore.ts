import dayjs, { Dayjs } from 'dayjs'
import { create } from 'zustand'


interface TableAddModalDataState {
  open: boolean
  workDate: Dayjs
  LOTNo: string
  variety: string
  standard: string
  length: string
  weight: string

  setOpen: () => void

  setWorkDate: (newWorkDate: Dayjs) => void

  setLOTNo: (newLOTNo: string) => void
  
  setVariety: (newVariety: string) => void
  
  setStandard: (newStandard: string) => void
  
  setLength: (newLength: string) => void
  
  setWeight: (newWeight: string) => void
}


const TableAddModalDataStore = create<TableAddModalDataState>(set => ({
  open: false,
  workDate: dayjs(),
  LOTNo: '',
  variety: '',
  standard: '',
  length: '',
  weight: '',

  setOpen: () => set(state => ({open: !state.open})),

  setWorkDate: newWorkDate => set(state => ({workDate: newWorkDate})),

  setLOTNo: newLOTNo => set(state => ({LOTNo: newLOTNo})),

  setVariety: newVariety => set(state => ({variety: newVariety})),

  setStandard: newStandard => set(state => ({standard: newStandard})),

  setLength: newLength => set(state => ({length: newLength})),

  setWeight: newWeight => set(state => ({weight: newWeight})),
}))

export default TableAddModalDataStore
