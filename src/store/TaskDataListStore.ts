import { create } from 'zustand'
import TaskData from 'interface/TaskData'


interface TaskDataListState {
  taskDataList: TaskData[]

  setTaskDataList: (taskData: TaskData) => void
}


const TaskDataListStore = create<TaskDataListState>(set => ({
  taskDataList: [
    {
      workDate: '2023-10-24',
      LOTNo: '231017-1k-01',
      variety: 'C7060P1',
      standard: '180x420',
      length: 2805,
      weight: 1735,
    },
    {
      workDate: '2023-10-24',
      LOTNo: '231017-1k-02',
      variety: 'C7060P1',
      standard: '180x420',
      length: 2805,
      weight: 1735,
    },
    {
      workDate: '2023-10-24',
      LOTNo: '231017-1k-03',
      variety: 'C7060P2',
      standard: '180x420',
      length: 2805,
      weight: 1735,
    },
    {
      workDate: '2023-10-25',
      LOTNo: '231017-1k-04',
      variety: 'C7060P2',
      standard: '180x420',
      length: 2805,
      weight: 1735,
    },
    {
      workDate: '2023-10-25',
      LOTNo: '231017-1k-05',
      variety: 'C7060P3',
      standard: '280x320',
      length: 2805,
      weight: 1735,
    },
    {
      workDate: '2023-10-25',
      LOTNo: '231017-1k-06',
      variety: 'C7060P3',
      standard: '280x320',
      length: 1235,
      weight: 435,
    },
    {
      workDate: '2023-10-26',
      LOTNo: '231017-1k-07',
      variety: 'C7060P4',
      standard: '280x320',
      length: 1235,
      weight: 435,
    },
    {
      workDate: '2023-10-26',
      LOTNo: '231017-1k-08',
      variety: 'C7060P4',
      standard: '280x320',
      length: 1235,
      weight: 435,
    },
    {
      workDate: '2023-10-26',
      LOTNo: '231017-1k-09',
      variety: 'C7060P5',
      standard: '380x360',
      length: 1235,
      weight: 435,
    },
    {
      workDate: '2023-10-27',
      LOTNo: '231017-1k-10',
      variety: 'C7060P5',
      standard: '380x360',
      length: 1235,
      weight: 435,
    },
  ],

  setTaskDataList: taskData => set(state => ({taskDataList: [...state.taskDataList, taskData]}))
}))

export default TaskDataListStore
