import { create } from 'zustand'
import dayjs, { Dayjs } from 'dayjs'
import MeltingTableData from 'interface/MeltingTableData'
import TableRowData from 'interface/TableRowData'


interface MeltingDataListState {
  searchDate: Dayjs
  meltingTableDataDateList: MeltingTableData[]
  meltingTableDataShowList: TableRowData<MeltingTableData>[]
  meltingTableDataShowListLength: number
  selectMeltingTableDataShowListLength: number
  meltingTableDataPasteList: MeltingTableData[]
  meltingTableDataPasteListLength: number
  lotNo: string
  variety: string
  standard: string
  length: string
  weight: string

  setSearchDate: (date: Dayjs) => void

  setMeltingTableDataDateList: (newMeltingTableDataDateList: MeltingTableData[]) => void

  filterMeltingTableDataShowList: () => void

  clickTableRow: (index: number) => void

  clearMeltingTableDataShowList: () => void

  setMeltingTableDataPasteList: () => void

  setLotNo: (newLotNo: string) => void

  setVariety: (newVariety: string) => void

  setStandard: (newStandard: string) => void

  setLength: (newLength: string) => void

  setWeight: (newWeight: string) => void
}


const MeltingDataListStore = create<MeltingDataListState>((set) => ({
  searchDate: dayjs(),
  meltingTableDataDateList: [],
  meltingTableDataShowList: [],
  meltingTableDataShowListLength: 0,
  selectMeltingTableDataShowListLength: 0,
  meltingTableDataPasteList: [],
  meltingTableDataPasteListLength: 0,
  lotNo: '',
  variety: '',
  standard: '',
  length: '',
  weight: '',

  setSearchDate: date => set({searchDate: date}),

  setMeltingTableDataDateList: newMeltingTableDataDateList => set({
    meltingTableDataDateList: newMeltingTableDataDateList,
    meltingTableDataShowList: newMeltingTableDataDateList.map((meltingTableDataDate, index) => ({
      index,
      selected: false,
      tableData: meltingTableDataDate,
      tableRowData: [
        (index + 1).toString().padStart(2, '0'),
        meltingTableDataDate.workDate,
        meltingTableDataDate.lotNo,
        meltingTableDataDate.variety,
        meltingTableDataDate.standard,
        meltingTableDataDate.length,
        meltingTableDataDate.weight,
      ],
    })),
    meltingTableDataShowListLength: newMeltingTableDataDateList.length,
  }),

  filterMeltingTableDataShowList: () => set(state => {
    const newMeltingTableDataShowList = state.meltingTableDataDateList.filter(meltingTableData =>
      (meltingTableData.lotNo.includes(state.lotNo.toUpperCase()) || meltingTableData.lotNo.includes(state.lotNo.toLowerCase())) &&
      (meltingTableData.variety.includes(state.variety.toUpperCase()) || meltingTableData.variety.includes(state.variety.toLowerCase())) &&
      (meltingTableData.standard.includes(state.standard.toUpperCase()) || meltingTableData.standard.includes(state.standard.toLowerCase())) &&
      (meltingTableData.length.includes(state.length.toUpperCase()) || meltingTableData.length.includes(state.length.toLowerCase())) &&
      (meltingTableData.weight.includes(state.weight.toUpperCase()) || meltingTableData.weight.includes(state.weight.toLowerCase())))
    return {
      meltingTableDataShowList: newMeltingTableDataShowList.map((meltingTableDataDate, index) => ({
        index,
        selected: false,
        tableData: meltingTableDataDate,
        tableRowData: [
          (index + 1).toString().padStart(2, '0'),
          meltingTableDataDate.workDate,
          meltingTableDataDate.lotNo,
          meltingTableDataDate.variety,
          meltingTableDataDate.standard,
          meltingTableDataDate.length,
          meltingTableDataDate.weight,
        ],
      })),
      meltingTableDataShowListLength: newMeltingTableDataShowList.length,
    }
  }),

  clickTableRow: index => set(state => {
    const newMeltingTableDataShowList = state.meltingTableDataShowList.map(meltingTableDataShow => {
      if(index === meltingTableDataShow.index) return {
        ...meltingTableDataShow,
        selected: !meltingTableDataShow.selected
      }
      return meltingTableDataShow
    })
    return {
      meltingTableDataShowList: newMeltingTableDataShowList,
      selectMeltingTableDataShowListLength: newMeltingTableDataShowList.filter(meltingTableDataShow => meltingTableDataShow.selected).length,
    }
  }),

  clearMeltingTableDataShowList: () => set(state => ({
    meltingTableDataShowList: state.meltingTableDataShowList.map(meltingTableDataShow => ({
      ...meltingTableDataShow,
      selected: false,
    })),
  })),

  setMeltingTableDataPasteList: () => set(state => ({
    meltingTableDataPasteList: state.meltingTableDataShowList.filter(meltingTableDataShow => meltingTableDataShow.selected).map(meltingTableDataShow => meltingTableDataShow.tableData),
    meltingTableDataPasteListLength: state.meltingTableDataShowList.filter(meltingTableDataShow => meltingTableDataShow.selected).length,
    meltingTableDataShowList: state.meltingTableDataShowList.map(meltingTableDataShow => ({
      ...meltingTableDataShow,
      selected: false,
    })),
  })),

  setLotNo: newLotNo => set({lotNo: newLotNo}),

  setVariety: newVariety => set({variety: newVariety}),

  setStandard: newStandard => set({standard: newStandard}),

  setLength: newLength => set({length: newLength}),

  setWeight: newWeight => set({weight: newWeight}),
}))

export default MeltingDataListStore
