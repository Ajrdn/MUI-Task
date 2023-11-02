import React from 'react'
import { styled } from '@mui/material/styles'
import DownloadForOffline from '@mui/icons-material/DownloadForOffline'
import CloudUpload from '@mui/icons-material/CloudUpload'
import Box from '@mui/material/Box'
import ItemDatePicker from './ItemDatePicker'
import FeatureButton from './FeatureButton'
import TableSearchStore from 'store/TableSearchStore'
import TaskDataListStore from 'store/TaskDataListStore'
import { TaskDataListDownloadXlsx, TaskDataListUploadXlsx } from 'utils/utils'


const TablePageSearchBarBackground = styled(Box)({
  width: '1520px',
  display: 'flex',
  gap: '12px',
})


function TablePageSearchBar() {
  const {
    searchDate,
  } = TableSearchStore()

  const {
    taskDataShowList,
    setTaskDataDateList,
  } = TaskDataListStore()

  const excelDownload = () => {
    TaskDataListDownloadXlsx(taskDataShowList)
  }

  const excelUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    TaskDataListUploadXlsx(event, searchDate.format('YYYY-MM-DD'), setTaskDataDateList)
  }

  return (
    <TablePageSearchBarBackground>
      <ItemDatePicker />
      <FeatureButton
        feature='액셀 다운로드'
        variant='contained'
        color='white'
        backgroundColor='#42A5F5'
        icon={<DownloadForOffline />}
        width='127px'
        padding='0 10px'
        disabled={taskDataShowList.length === 0}
        label={false}
        buttonPerformance={excelDownload}
      />
      <FeatureButton
        feature='액셀 업로드'
        variant='outlined'
        color='#42A5F5'
        backgroundColor='#42A5F5'
        icon={<CloudUpload />}
        width='113px'
        padding='0 10px'
        label
        inputPerformance={excelUpload}
      />
    </TablePageSearchBarBackground>
  )
}

export default TablePageSearchBar
