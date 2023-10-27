import dayjs, { Dayjs } from 'dayjs'
import { create } from 'zustand'
import TaskData from 'interface/TaskData'
import TableHeader from 'interface/TableHeader'


interface TaskDataListState {
  taskDataTitleList: TableHeader[]
  taskDataList: TaskData[]
  taskDataShowList: TaskData[]

  setTaskDataListByObject: (taskData: TaskData) => void

  setTaskDataListByExcel: (taskDataExcel: TaskData[]) => void

  setTaskDataShowListByDate: (date: Dayjs) => void
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
  taskDataList: [
    {
      workDate: dayjs('2023-10-24'),
      LOTNo: '231017-1k-01',
      variety: 'C7060P1',
      standard: '180x420',
      length: '2805',
      weight: '1735',
    },
    {
      workDate: dayjs('2023-10-24'),
      LOTNo: '231017-1k-02',
      variety: 'C7060P1',
      standard: '180x420',
      length: '2805',
      weight: '1735',
    },
    {
      workDate: dayjs('2023-10-24'),
      LOTNo: '231017-1k-03',
      variety: 'C7060P2',
      standard: '180x420',
      length: '2805',
      weight: '1735',
    },
    {
      workDate: dayjs('2023-10-25'),
      LOTNo: '231017-1k-04',
      variety: 'C7060P2',
      standard: '180x420',
      length: '2805',
      weight: '1735',
    },
    {
      workDate: dayjs('2023-10-25'),
      LOTNo: '231017-1k-05',
      variety: 'C7060P3',
      standard: '280x320',
      length: '2805',
      weight: '1735',
    },
    {
      workDate: dayjs('2023-10-25'),
      LOTNo: '231017-1k-06',
      variety: 'C7060P3',
      standard: '280x320',
      length: '1235',
      weight: '435',
    },
    {
      workDate: dayjs('2023-10-26'),
      LOTNo: '231017-1k-07',
      variety: 'C7060P4',
      standard: '280x320',
      length: '1235',
      weight: '435',
    },
    {
      workDate: dayjs('2023-10-26'),
      LOTNo: '231017-1k-08',
      variety: 'C7060P4',
      standard: '280x320',
      length: '1235',
      weight: '435',
    },
    {
      workDate: dayjs('2023-10-26'),
      LOTNo: '231017-1k-09',
      variety: 'C7060P5',
      standard: '380x360',
      length: '1235',
      weight: '435',
    },
    {
      workDate: dayjs('2023-10-27'),
      LOTNo: '231017-1k-10',
      variety: 'C7060P5',
      standard: '380x360',
      length: '1235',
      weight: '435',
    },
  ],
  taskDataShowList: [
    {
      workDate: dayjs('2023-10-24'),
      LOTNo: '231017-1k-01',
      variety: 'C7060P1',
      standard: '180x420',
      length: '2805',
      weight: '1735',
    },
    {
      workDate: dayjs('2023-10-24'),
      LOTNo: '231017-1k-02',
      variety: 'C7060P1',
      standard: '180x420',
      length: '2805',
      weight: '1735',
    },
    {
      workDate: dayjs('2023-10-24'),
      LOTNo: '231017-1k-03',
      variety: 'C7060P2',
      standard: '180x420',
      length: '2805',
      weight: '1735',
    },
  ],

  setTaskDataListByObject: taskData => set(state => ({taskDataList: [...state.taskDataList, taskData]})),

  setTaskDataListByExcel: taskDataExcel => set(state => ({taskDataList: [...state.taskDataList, ...taskDataExcel]})),

  setTaskDataShowListByDate: date => set(state => ({taskDataListByDate: state.taskDataList.filter(taskData => taskData.workDate.isSame(date))})),
}))

export default TaskDataListStore
