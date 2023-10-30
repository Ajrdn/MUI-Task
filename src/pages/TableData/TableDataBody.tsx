import React from 'react'
import TaskDataListStore from 'store/TaskDataListStore'
import TableBody from '@mui/material/TableBody'
import { TaskDataClient } from 'interface/TaskData'
import TableDataRow from './TableDataRow'


function TableDataBody() {
  const taskDataShowList: TaskDataClient[] = TaskDataListStore(state => state.taskDataShowList)

  return (
    <TableBody>
      {taskDataShowList.map((taskData, index) => {
        return (
          <TableDataRow
            key={`${taskData.lotNo}${index}`}
            cellDataList={[
              (index + 1).toString().padStart(2, '0'),
              taskData.workDate.format('YYYY-MM-DD'),
              taskData.lotNo,
              taskData.variety,
              taskData.standard,
              taskData.length,
              taskData.weight,
            ]}
            taskDataRow={{
              index: (index + 1).toString().padStart(2, '0'),
              ...taskData,
            }}
          />
        )
      })}
    </TableBody>
  )
}

export default TableDataBody
