import { create } from 'zustand'
import { TaskDataClient } from 'interface/TaskData'


interface TaskDataListState {
  taskDataDateList: TaskDataClient[]
  taskDataShowList: TaskDataClient[]

  setTaskDataDateList: (newTaskDataDateList: TaskDataClient[]) => void

  setTaskDataShowList: (newTaskDataDateList: TaskDataClient[]) => void
}


const TaskDataListStore = create<TaskDataListState>(set => ({
  taskDataDateList: [],
  taskDataShowList: [],

  setTaskDataDateList: newTaskDataDateList => set(state => ({
    taskDataDateList: newTaskDataDateList,
    taskDataShowList: newTaskDataDateList,
  })),

  setTaskDataShowList: newTaskDataDateList => set(state => ({taskDataShowList: newTaskDataDateList})),
}))

export default TaskDataListStore
