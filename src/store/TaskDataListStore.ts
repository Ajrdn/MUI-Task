import { create } from 'zustand'
import TaskData from 'interface/TaskData'
import TableTaskDataRow from 'interface/TableTaskDataRow'


interface TaskDataListState {
  taskDataDateList: TaskData[]
  taskDataShowList: TableTaskDataRow[]
  selectTaskDataShowListLength: number
  taskDataPasteList: TaskData[]

  setTaskDataDateList: (newTaskDataDateList: TaskData[]) => void

  setTaskDataShowList: (newTaskDataDateList: TableTaskDataRow[]) => void

  setTaskDataShowListByFilter: (lotNo: string, variety: string, standard: string, length: string, weight: string) => void

  clickTableRow: (index: number) => void

  clearTaskDataShowList: () => void

  setTaskDataPasteList: () => void
}


const TaskDataListStore = create<TaskDataListState>(set => ({
  taskDataDateList: [],
  taskDataShowList: [],
  selectTaskDataShowListLength: 0,
  taskDataPasteList: [],

  setTaskDataDateList: newTaskDataDateList => set({
    taskDataDateList: newTaskDataDateList,
    taskDataShowList: newTaskDataDateList.map((taskDataDate, index) => ({
      index,
      selected: false,
      taskData: taskDataDate,
    })),
  }),

  setTaskDataShowList: newTaskDataDateList => set({taskDataShowList: newTaskDataDateList}),

  setTaskDataShowListByFilter: (lotNo, variety, standard, length, weight) => set(state => ({taskDataShowList: state.taskDataDateList.filter(taskData =>
    (taskData.lotNo.includes(lotNo.toUpperCase()) || taskData.lotNo.includes(lotNo.toLowerCase())) &&
    (taskData.variety.includes(variety.toUpperCase()) || taskData.variety.includes(variety.toLowerCase())) &&
    (taskData.standard.includes(standard.toUpperCase()) || taskData.standard.includes(standard.toLowerCase())) &&
    (taskData.length.includes(length.toUpperCase()) || taskData.length.includes(length.toLowerCase())) &&
    (taskData.weight.includes(lotNo.toUpperCase()) || taskData.weight.includes(weight.toLowerCase()))
  ).map((taskDataDate, index) => ({
    index,
    selected: false,
    taskData: taskDataDate,
  }))})),

  clickTableRow: index => set(state => {
    const newTaskDataShowList = state.taskDataShowList.map(taskDataShow => {
      if(index === taskDataShow.index) return {
        ...taskDataShow,
        selected: !taskDataShow.selected,
      }
      return taskDataShow
    })
    return {
      taskDataShowList: newTaskDataShowList,
      selectTaskDataShowListLength: newTaskDataShowList.filter(taskDataShow => taskDataShow.selected).length
    }
  }),

  clearTaskDataShowList: () => set(state => ({taskDataShowList: state.taskDataShowList.map(taskDataShow => ({
    ...taskDataShow,
    selected: false,
  }))})),

  setTaskDataPasteList: () => set(state => {
    state.clearTaskDataShowList()
    return {
      taskDataPasteList: state.taskDataShowList.filter(taskDataShow => taskDataShow.selected).map(taskDataShow => taskDataShow.taskData),
    }
  }),
}))

export default TaskDataListStore
