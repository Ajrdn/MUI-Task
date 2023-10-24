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
      LOTNo: '231017-1k-1',
      variety: 'C7060P',
      standard: '180x420',
      length: 2805,
      weight: 1735,
    },
    {
      workDate: '2023-10-24',
      LOTNo: '231017-1k-1',
      variety: 'C7060P',
      standard: '180x420',
      length: 2805,
      weight: 1735,
    },
    {
      workDate: '2023-10-24',
      LOTNo: '231017-1k-1',
      variety: 'C7060P',
      standard: '180x420',
      length: 2805,
      weight: 1735,
    },
    {
      workDate: '2023-10-24',
      LOTNo: '231017-1k-1',
      variety: 'C7060P',
      standard: '180x420',
      length: 2805,
      weight: 1735,
    },
    {
      workDate: '2023-10-24',
      LOTNo: '231017-1k-1',
      variety: 'C7060P',
      standard: '180x420',
      length: 2805,
      weight: 1735,
    },
    {
      workDate: '2023-10-24',
      LOTNo: '231017-1k-1',
      variety: 'C7060P',
      standard: '180x420',
      length: 2805,
      weight: 1735,
    },
    {
      workDate: '2023-10-24',
      LOTNo: '231017-1k-1',
      variety: 'C7060P',
      standard: '180x420',
      length: 2805,
      weight: 1735,
    },
    {
      workDate: '2023-10-24',
      LOTNo: '231017-1k-1',
      variety: 'C7060P',
      standard: '180x420',
      length: 2805,
      weight: 1735,
    },
    {
      workDate: '2023-10-24',
      LOTNo: '231017-1k-1',
      variety: 'C7060P',
      standard: '180x420',
      length: 2805,
      weight: 1735,
    },
    {
      workDate: '2023-10-24',
      LOTNo: '231017-1k-1',
      variety: 'C7060P',
      standard: '180x420',
      length: 2805,
      weight: 1735,
    },
    {
      workDate: '2023-10-24',
      LOTNo: '231017-1k-1',
      variety: 'C7060P',
      standard: '180x420',
      length: 2805,
      weight: 1735,
    },
  ]

  return (
    <TableBody>
      {taskDataList.map((taskData, index) => (
        <TableRow>
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

export default  TableDataBody
