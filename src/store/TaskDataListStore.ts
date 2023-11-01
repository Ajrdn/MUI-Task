import { create } from 'zustand'
import TaskData from 'interface/TaskData'
import { MenuValue } from 'interface/SearchMenu'


interface TaskDataListState {
  taskDataDateList: TaskData[]
  taskDataShowList: TaskData[]

  setTaskDataDateList: (newTaskDataDateList: TaskData[]) => void

  setTaskDataShowList: (newTaskDataDateList: TaskData[]) => void

  setTaskDataShowListBySearchData: (select: MenuValue, word: string, detailSelect?: MenuValue, detailWord?: string) => void

  setTaskDataShowListByFilter: (lotNo: string, variety: string, standard: string, length: string, weight: string) => void
}


const TaskDataListStore = create<TaskDataListState>(set => ({
  taskDataDateList: [],
  taskDataShowList: [],

  setTaskDataDateList: newTaskDataDateList => set({
    taskDataDateList: newTaskDataDateList,
    taskDataShowList: newTaskDataDateList,
  }),

  setTaskDataShowList: newTaskDataDateList => set({taskDataShowList: newTaskDataDateList}),

  setTaskDataShowListBySearchData: (select, word, detailSelect?, detailWord?) => {
    set(state => ({taskDataShowList: state.taskDataDateList.filter(taskData => taskData[select].includes(word.toUpperCase()) || taskData[select].includes(word.toLowerCase()))}))
    if(detailSelect)
      set(state => ({taskDataShowList: state.taskDataShowList.filter(taskData => taskData[detailSelect].includes(detailWord!.toUpperCase()) || taskData[detailSelect].includes(detailWord!.toLowerCase()))}))
  },

  setTaskDataShowListByFilter: (lotNo, variety, standard, length, weight) => set(state => ({taskDataShowList: state.taskDataDateList.filter(taskData =>
    (taskData.lotNo.includes(lotNo.toUpperCase()) || taskData.lotNo.includes(lotNo.toLowerCase())) &&
    (taskData.variety.includes(variety.toUpperCase()) || taskData.variety.includes(variety.toLowerCase())) &&
    (taskData.standard.includes(standard.toUpperCase()) || taskData.standard.includes(standard.toLowerCase())) &&
    (taskData.length.includes(length.toUpperCase()) || taskData.length.includes(length.toLowerCase())) &&
    (taskData.weight.includes(lotNo.toUpperCase()) || taskData.weight.includes(weight.toLowerCase()))
  )})),
}))

export default TaskDataListStore
