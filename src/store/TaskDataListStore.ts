import { create } from 'zustand'
import { TaskDataClient } from 'interface/TaskData'
import { MenuValue } from 'interface/SearchMenu'


interface TaskDataListState {
  taskDataDateList: TaskDataClient[]
  taskDataShowList: TaskDataClient[]

  setTaskDataDateList: (newTaskDataDateList: TaskDataClient[]) => void

  setTaskDataShowList: (newTaskDataDateList: TaskDataClient[]) => void

  setTaskDataShowListBySearchData: (select: MenuValue, word: string, detailSelect?: MenuValue, detailWord?: string) => void
}


const TaskDataListStore = create<TaskDataListState>(set => ({
  taskDataDateList: [],
  taskDataShowList: [],

  setTaskDataDateList: newTaskDataDateList => set(state => ({
    taskDataDateList: newTaskDataDateList,
    taskDataShowList: newTaskDataDateList,
  })),

  setTaskDataShowList: newTaskDataDateList => set(state => ({taskDataShowList: newTaskDataDateList})),

  setTaskDataShowListBySearchData: (select, word, detailSelect?, detailWord?) => {
    set(state => ({taskDataShowList: state.taskDataDateList.filter(taskData => taskData[select].includes(word))}))
    if(detailSelect)
      set(state => ({taskDataShowList: state.taskDataShowList.filter(taskData => taskData[detailSelect].includes(detailWord!))}))
  }
}))

export default TaskDataListStore
