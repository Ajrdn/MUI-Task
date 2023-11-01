import React, { useEffect } from 'react'
import TaskDataListStore from 'store/TaskDataListStore'
import TableDataCopyStore from 'store/TableDataCopyStore'
import TableBody from '@mui/material/TableBody'
import TaskData from 'interface/TaskData'
import TableDataRow from './TableDataRow'
import TableTaskDataRow from 'interface/TableTaskDataRow'


function TableDataBody() {
  const taskDataShowList: TaskData[] = TaskDataListStore(state => state.taskDataShowList)
  const tableTaskDataRowCopyList: TableTaskDataRow[] = TableDataCopyStore(state => state.tableTaskDataRowCopyList)
  const setTableTaskDataRowCopyList = TableDataCopyStore(state => state.setTableTaskDataRowCopyList)

  useEffect(() => {
    const tableTaskDataRowList: TableTaskDataRow[] = taskDataShowList.map((taskData, index) => ({
      index,
      selected: false,
      taskData: taskData,
    }))

    setTableTaskDataRowCopyList(tableTaskDataRowList)
  }, [taskDataShowList, setTableTaskDataRowCopyList])

  return (
    <TableBody>
      {tableTaskDataRowCopyList.map((tableTaskDataRow, index) => {
        return (
          <TableDataRow
            key={`${tableTaskDataRow.taskData.lotNo}${index}`}
            cellDataList={[
              (index + 1).toString().padStart(2, '0'),
              tableTaskDataRow.taskData.workDate,
              tableTaskDataRow.taskData.lotNo,
              tableTaskDataRow.taskData.variety,
              tableTaskDataRow.taskData.standard,
              tableTaskDataRow.taskData.length,
              tableTaskDataRow.taskData.weight,
            ]}
            index={index}
            selected={tableTaskDataRow.selected}
          />
        )
      })}
    </TableBody>
  )
}

export default TableDataBody
