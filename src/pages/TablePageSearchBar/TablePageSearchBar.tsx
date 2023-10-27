import dayjs from 'dayjs'
import React from 'react'
import { utils, read } from 'xlsx'
import { styled } from '@mui/material/styles'
import Search from '@mui/icons-material/Search'
import DownloadForOffline from '@mui/icons-material/DownloadForOffline'
import CloudUpload from '@mui/icons-material/CloudUpload'
import Box from '@mui/material/Box'
import ItemSelectSearch from './ItemSelectSearch'
import ItemDatePicker from './ItemDatePicker'
import ItemTextSearch from './ItemTextSearch'
import FeatureButton from './FeatureButton'
import TaskData from 'interface/TaskData'
import TableHeader from 'interface/TableHeader'
import SearchMenu from 'interface/SearchMenu'
import TableSearchStore from 'store/TableSearchStore'
import TaskDataListStore from 'store/TaskDataListStore'
import { TaskDataListDownloadXlsx } from 'utils/utils'
import DetailItemSelectSearch from './DetailItemSelectSearch'
import DetailItemTextSearch from './DetailItemTextSearch'


const TablePageSearchBarBackground = styled(Box)({
  width: '1520px',
  display: 'flex',
  gap: '12px',
})


interface ExcelData {
  'LOT No.': string
  'No.': string
  '규격': string
  '슬라브 길이': string
  '작업일': string
  '중량': string
  '품종': string
}


function TablePageSearchBar() {
  const text = TableSearchStore(state => state.searchWord)
  
  const taskDataTitleList: TableHeader[] = TaskDataListStore(state => state.taskDataTitleList)
  const taskDataList: TaskData[] = TaskDataListStore(state => state.taskDataList)

  const setTaskDataListByExcel = TaskDataListStore(state => state.setTaskDataListByExcel)

  const excelDownload = () => {
    TaskDataListDownloadXlsx(taskDataTitleList.map(tableHeader => tableHeader.title), taskDataList)
  }

  const excelUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return

    const fileReader = new FileReader()
    fileReader.readAsArrayBuffer(event.target.files[0])
    fileReader.onload = (event: ProgressEvent<FileReader>) => {
      if (!event.target) return
      const bufferArray = event.target.result
      const fileInformation = read(bufferArray, {
        type: 'buffer',
        cellText: false,
        cellDates: true,
      })
      const sheetName = fileInformation.SheetNames[0]
      const rawData = fileInformation.Sheets[sheetName]
      const data: ExcelData[] = utils.sheet_to_json<ExcelData>(rawData)
      const taskDataList: TaskData[] = data.map(taskData => ({
        workDate: dayjs(taskData['작업일']),
        lotNo: taskData['LOT No.'],
        variety: taskData['품종'],
        standard: taskData['규격'],
        length: taskData['슬라브 길이'],
        weight: taskData['중량'],
      }))
      setTaskDataListByExcel(taskDataList)
    }
  }

  const searchData = () => {

  }

  const searchMenuTitleTranslate = (title: SearchMenu): string => {
    if(title === 'LOT No.') return 'LOTNo'
    else if(title === '품종') return 'variety'
    else if(title === '규격') return 'standard'
    else if(title === '슬라브 길이') return 'length'
    else if(title === '중량') return 'weight'
    return 'all'
  }

  return (
    <TablePageSearchBarBackground>
      <ItemDatePicker />
      <ItemSelectSearch />
      <ItemTextSearch />
      <DetailItemSelectSearch />
      <DetailItemTextSearch />
      <FeatureButton
        feature='검색'
        variant='contained'
        color='white'
        backgroundColor='#13243A'
        icon={<Search />}
        width='82px'
        padding='0 15px'
        label={false}
        disabled={text === ''}
        buttonPerformance={searchData}
      />
      <FeatureButton
        feature='액셀 다운로드'
        variant='contained'
        color='white'
        backgroundColor='#42A5F5'
        icon={<DownloadForOffline />}
        width='127px'
        padding='0 10px'
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
