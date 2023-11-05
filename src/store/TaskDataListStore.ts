import { create } from 'zustand'
import TaskData from 'interface/TaskData'
import TableRowData from 'interface/TableRowData'


interface TaskDataListState {
  taskDataDateList: TaskData[]
  taskDataShowList: TableRowData<TaskData>[]
  selectTaskDataShowListLength: number
  taskDataPasteList: TaskData[]
  lotNo: string
  variety: string
  standard: string
  length: string
  weight: string

  setTaskDataDateList: (newTaskDataDateList: TaskData[]) => void

  setTaskDataShowList: (newTaskDataDateList: TableRowData<TaskData>[]) => void

  setTaskDataShowListByFilter: (lotNo: string, variety: string, standard: string, length: string, weight: string) => void

  clickTableRow: (index: number) => void

  clearTaskDataShowList: () => void

  setTaskDataPasteList: () => void

  setLotNo: (newLotNo: string) => void

  setVariety: (newVariety: string) => void

  setStandard: (newStandard: string) => void

  setLength: (newLength: string) => void

  setWeight: (newWeight: string) => void
}


const TaskDataListStore = create<TaskDataListState>((set) => ({
  taskDataDateList: [],
  taskDataShowList: [],
  selectTaskDataShowListLength: 0,
  taskDataPasteList: [],
  lotNo: '',
  variety: '',
  standard: '',
  length: '',
  weight: '',

  setTaskDataDateList: (newTaskDataDateList) => set({
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
  }),

  setTaskDataShowList: newTaskDataDateList => set({taskDataShowList: newTaskDataDateList}),

  setTaskDataShowListByFilter: (lotNo, variety, standard, length, weight) => set(state => ({taskDataShowList: state.taskDataDateList.filter(taskData =>
    (taskData.lotNo.includes(lotNo.toUpperCase()) || taskData.lotNo.includes(lotNo.toLowerCase())) &&
    (taskData.variety.includes(variety.toUpperCase()) || taskData.variety.includes(variety.toLowerCase())) &&
    (taskData.standard.includes(standard.toUpperCase()) || taskData.standard.includes(standard.toLowerCase())) &&
    (taskData.length.includes(length.toUpperCase()) || taskData.length.includes(length.toLowerCase())) &&
    (taskData.weight.includes(lotNo.toUpperCase()) || taskData.weight.includes(weight.toLowerCase())))
    .map((taskDataDate, index) => ({
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
  })),

  clickTableRow: (index) => set(state => {
    const newTaskDataShowList = state.taskDataShowList.map((taskDataShow) => {
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
    taskDataShowList: state.taskDataShowList.map((taskDataShow) => ({
      ...taskDataShow,
      selected: false,
    })),
  })),

  setTaskDataPasteList: () => set(state => {
    state.clearTaskDataShowList()
    return {
      taskDataPasteList: state.taskDataShowList.filter(taskDataShow => taskDataShow.selected).map(taskDataShow => taskDataShow.tableData)
    }
  }),

  setLotNo: (newLotNo: string) => set({lotNo: newLotNo}),

  setVariety: (newVariety: string) => set({variety: newVariety}),

  setStandard: (newStandard: string) => set({standard: newStandard}),

  setLength: (newLength: string) => set({length: newLength}),

  setWeight: (newWeight: string) => set({weight: newWeight}),
}))

export default TaskDataListStore
