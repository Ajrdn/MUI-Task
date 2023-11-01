import { create } from 'zustand'


interface TableHeaderFilterState {
  lotNo: string
  variety: string
  standard: string
  length: string
  weight: string

  setLotNo: (newLotNo: string) => void

  setVariety: (newVariety: string) => void

  setStandard: (newStandard: string) => void

  setLength: (newLength: string) => void

  setWeight: (newWeight: string) => void
}


const TableHeaderFilterStore = create<TableHeaderFilterState>(set => ({
  lotNo: '',
  variety: '',
  standard: '',
  length: '',
  weight: '',

  setLotNo: (newLotNo: string) => set({lotNo: newLotNo}),

  setVariety: (newVariety: string) => set({variety: newVariety}),

  setStandard: (newStandard: string) => set({standard: newStandard}),

  setLength: (newLength: string) => set({length: newLength}),

  setWeight: (newWeight: string) => set({weight: newWeight}),
}))

export default TableHeaderFilterStore
