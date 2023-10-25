import React from 'react'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'


interface TaskData {
  workDate: string
  LOTNo: string
  variety: string
  standard: string
  length: number
  weight: number
}


const TableDataBody = () => {
  const taskDataList: TaskData[] =[
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
  ]

  return (
    <TableBody>
      {taskDataList.map((taskData, index) => (
        <TableRow key={taskData.LOTNo}>
          <TableCell align='center'>{(index + 1).toString().padStart(2, '0')}</TableCell>
          <TableCell align='center'>{taskData.workDate}</TableCell>
          <TableCell align='center'>{taskData.LOTNo}</TableCell>
          <TableCell align='center'>{taskData.variety}</TableCell>
          <TableCell align='center'>{taskData.standard}</TableCell>
          <TableCell align='center'>{taskData.length}</TableCell>
          <TableCell align='center'>{taskData.weight}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  )
}

export default TableDataBody
