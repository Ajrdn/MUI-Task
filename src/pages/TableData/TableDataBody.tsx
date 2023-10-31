import React, { useEffect } from 'react'
import TaskDataListStore from 'store/TaskDataListStore'
import TableDataCopyStore from 'store/TableDataCopyStore'
import TableBody from '@mui/material/TableBody'
import { TaskDataClient } from 'interface/TaskData'
import TableDataRow from './TableDataRow'
import TableTaskDataRow from 'interface/TableTaskDataRow'


function TableDataBody() {
  const taskDataShowList: TaskDataClient[] = TaskDataListStore(state => state.taskDataShowList)
  const tableTaskDataRowCopyList: TableTaskDataRow[] = TableDataCopyStore(state => state.tableTaskDataRowCopyList)
  const addTableTaskDataRowCopyList = TableDataCopyStore(state => state.addTableTaskDataRowCopyList)

  useEffect(() => {
    taskDataShowList.map((taskData, index) => addTableTaskDataRowCopyList({
      index,
      selected: false,
      taskData: taskData,
    }))
  }, [taskDataShowList, addTableTaskDataRowCopyList])

  return (
    <TableBody>
      {tableTaskDataRowCopyList.map((tableTaskDataRow, index) => {
        return (
          <TableDataRow
            key={`${tableTaskDataRow.taskData.lotNo}${index}`}
            cellDataList={[
              (index + 1).toString().padStart(2, '0'),
              tableTaskDataRow.taskData.workDate.format('YYYY-MM-DD'),
              tableTaskDataRow.taskData.lotNo,
              tableTaskDataRow.taskData.variety,
              tableTaskDataRow.taskData.standard,
              tableTaskDataRow.taskData.length,
              tableTaskDataRow.taskData.weight,
            ]}
            taskDataRow={tableTaskDataRow}
          />
        )
      })}
    </TableBody>
  )
}

export default TableDataBody
