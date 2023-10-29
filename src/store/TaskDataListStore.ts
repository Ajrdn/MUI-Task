import { Dayjs } from 'dayjs'
import { create } from 'zustand'
import { TaskDataClient } from 'interface/TaskData'
import TableHeader from 'interface/TableHeader'
import { MenuValue } from 'interface/SearchMenu'


interface TaskDataListState {
  taskDataTitleList: TableHeader[]
  taskDataDateList: TaskDataClient[]
  taskDataShowList: TaskDataClient[]

  setTaskDataListByObject: (taskData: TaskDataClient) => void

  setTaskDataListByList: (taskDataExcel: TaskDataClient[]) => void

  setTaskDataDateList: (newTaskDataDateList: TaskDataClient[]) => void

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

  setTaskDataListByObject: taskData => set(state => ({taskDataDateList: [...state.taskDataDateList, taskData]})),

  setTaskDataListByList: taskDataExcel => set(state => ({taskDataDateList: [...state.taskDataDateList, ...taskDataExcel]})),

  setTaskDataDateList: newTaskDataDateList => set(state => ({taskDataDateList: newTaskDataDateList})),

  setTaskDataShowListByList: newTaskDataDateList => set(state => ({taskDataShowList: newTaskDataDateList})),

  setTaskDataShowListBySearchData: (select, word, detailSelect?, detailWord?) => {
    set(state => ({taskDataShowList: state.taskDataDateList.filter(taskData => taskData[select].includes(word))}))
    if(typeof detailSelect !== 'undefined')
      set(state => ({taskDataShowList: state.taskDataDateList.filter(taskData => taskData[detailSelect].includes(detailWord!))}))
  }
}))

export default TaskDataListStore
