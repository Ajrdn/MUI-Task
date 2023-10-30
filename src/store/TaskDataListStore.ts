import { create } from 'zustand'
import { TaskDataClient } from 'interface/TaskData'
import TableHeader from 'interface/TableHeader'
import { MenuValue } from 'interface/SearchMenu'


interface TaskDataListState {
  taskDataTitleList: TableHeader[]
  taskDataDateList: TaskDataClient[]
  taskDataShowList: TaskDataClient[]

  setTaskDataDateList: (newTaskDataDateList: TaskDataClient[]) => void

  setTaskDataDateListByObject: (taskData: TaskDataClient) => void

  setTaskDataDateListByList: (taskDataList: TaskDataClient[]) => void

  setTaskDataShowListByList: (newTaskDataDateList: TaskDataClient[]) => void

  setTaskDataShowListBySearchData: (select: MenuValue, word: string, detailSelect?: MenuValue, detailWord?: string) => void
}


const TaskDataListStore = create<TaskDataListState>(set => ({
  taskDataTitleList: [
    {
      title: 'No.',
      size: '64px',
    },
    {
      title: '작업일',
      size: '128px',
    },
    {
      title: 'LOT No.',
      size: '300px',
    },
    {
      title: '품종',
      size: '300px',
    },
    {
      title: '규격',
      size: '300px',
    },
    {
      title: '슬라브 길이',
      size: '300px',
    },
    {
      title: '중량',
      size: '128px',
    },
  ],
  taskDataDateList: [],
  taskDataShowList: [],

  setTaskDataDateList: newTaskDataDateList => set(state => ({taskDataDateList: newTaskDataDateList})),

  setTaskDataDateListByObject: taskData => set(state => ({taskDataDateList: [...state.taskDataDateList, taskData]})),

  setTaskDataDateListByList: taskDataList => set(state => ({taskDataDateList: [...state.taskDataDateList, ...taskDataList]})),

  setTaskDataShowListByList: newTaskDataDateList => set(state => ({taskDataShowList: newTaskDataDateList})),

  setTaskDataShowListBySearchData: (select, word, detailSelect?, detailWord?) => {
    set(state => ({taskDataShowList: state.taskDataDateList.filter(taskData => taskData[select].includes(word))}))
    if(typeof detailSelect !== 'undefined')
      set(state => ({taskDataShowList: state.taskDataDateList.filter(taskData => taskData[detailSelect].includes(detailWord!))}))
  }
}))

export default TaskDataListStore
