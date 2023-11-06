import { create } from 'zustand'
import TaskData from 'interface/TaskData'
import TableRowData from 'interface/TableRowData'
import dayjs, { Dayjs } from 'dayjs'


interface MeltingDataListState {
  searchDate: Dayjs
  taskDataDateList: TaskData[]
  taskDataShowList: TableRowData<TaskData>[]
  taskDataShowListLength: number
  selectTaskDataShowListLength: number
  taskDataPasteList: TaskData[]
  taskDataPasteListLength: number
  lotNo: string
  variety: string
  standard: string
  length: string
  weight: string

  setSearchDate: (date: Dayjs) => void

  setTaskDataDateList: (newTaskDataDateList: TaskData[]) => void

  setTaskDataShowListByFilter: () => void

  clickTableRow: (index: number) => void

  clearTaskDataShowList: () => void

  setTaskDataPasteList: () => void

  setLotNo: (newLotNo: string) => void

  setVariety: (newVariety: string) => void

  setStandard: (newStandard: string) => void

  setLength: (newLength: string) => void

  setWeight: (newWeight: string) => void
}


const MeltingDataListStore = create<MeltingDataListState>((set) => ({
  searchDate: dayjs(),
  taskDataDateList: [],
  taskDataShowList: [],
  taskDataShowListLength: 0,
  selectTaskDataShowListLength: 0,
  taskDataPasteList: [],
  taskDataPasteListLength: 0,
  lotNo: '',
  variety: '',
  standard: '',
  length: '',
  weight: '',

  setSearchDate: date => set({searchDate: date}),

  setTaskDataDateList: newTaskDataDateList => set({
    taskDataDateList: newTaskDataDateList,
    taskDataShowList: newTaskDataDateList.map((taskDataDate, index) => ({
      index,
      selected: false,
      tableData: taskDataDate,
      tableRowData: [
        (index + 1).toString().padStart(2, '0'),
        taskDataDate.workDate,
        taskDataDate.lotNo,
        taskDataDate.variety,
        taskDataDate.standard,
        taskDataDate.length,
        taskDataDate.weight,
      ],
    })),
    taskDataShowListLength: newTaskDataDateList.length,
  }),

  setTaskDataShowListByFilter: () => set(state => {
    const newTaskDataShowList = state.taskDataDateList.filter(taskData =>
      (taskData.lotNo.includes(state.lotNo.toUpperCase()) || taskData.lotNo.includes(state.lotNo.toLowerCase())) &&
      (taskData.variety.includes(state.variety.toUpperCase()) || taskData.variety.includes(state.variety.toLowerCase())) &&
      (taskData.standard.includes(state.standard.toUpperCase()) || taskData.standard.includes(state.standard.toLowerCase())) &&
      (taskData.length.includes(state.length.toUpperCase()) || taskData.length.includes(state.length.toLowerCase())) &&
      (taskData.weight.includes(state.weight.toUpperCase()) || taskData.weight.includes(state.weight.toLowerCase())))
    return {
      taskDataShowList: newTaskDataShowList.map((taskDataDate, index) => ({
        index,
        selected: false,
        tableData: taskDataDate,
        tableRowData: [
          (index + 1).toString().padStart(2, '0'),
          taskDataDate.workDate,
          taskDataDate.lotNo,
          taskDataDate.variety,
          taskDataDate.standard,
          taskDataDate.length,
          taskDataDate.weight,
        ],
      })),
      taskDataShowListLength: newTaskDataShowList.length,
    }
  }),

  clickTableRow: index => set(state => {
    const newTaskDataShowList = state.taskDataShowList.map(taskDataShow => {
      if(index === taskDataShow.index) return {
        ...taskDataShow,
        selected: !taskDataShow.selected
      }
      return taskDataShow
    })
    return {
      taskDataShowList: newTaskDataShowList,
      selectTaskDataShowListLength: newTaskDataShowList.filter(taskDataShow => taskDataShow.selected).length,
    }
  }),

  clearTaskDataShowList: () => set(state => ({
    taskDataShowList: state.taskDataShowList.map(taskDataShow => ({
      ...taskDataShow,
      selected: false,
    })),
  })),

  setTaskDataPasteList: () => set(state => ({
    taskDataPasteList: state.taskDataShowList.filter(taskDataShow => taskDataShow.selected).map(taskDataShow => taskDataShow.tableData),
    taskDataPasteListLength: state.taskDataShowList.filter(taskDataShow => taskDataShow.selected).length,
    taskDataShowList: state.taskDataShowList.map(taskDataShow => ({
      ...taskDataShow,
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
