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
import TableSearchStore from 'store/TableSearchStore'
import TaskDataListStore from 'store/TaskDataListStore'
import { TaskDataListDownloadXlsx } from 'utils/utils'
import dayjs from 'dayjs'


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


const TablePageSearchBar = () => {
  const item = TableSearchStore(state => state.searchItem)
  const setItem = TableSearchStore(state => state.setSearchItem)
  const word = TableSearchStore(state => state.searchWord)
  const setWord = TableSearchStore(state => state.setSearchWord)

  const detailItem = TableSearchStore(state => state.searchDetailItem)
  const setDetailItem = TableSearchStore(state => state.setSearchDetailItem)
  const detailWord = TableSearchStore(state => state.searchDetailWord)
  const setDetailWord = TableSearchStore(state => state.setSearchDetailWord)

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
        LOTNo: taskData['LOT No.'],
        variety: taskData['품종'],
        standard: taskData['규격'],
        length: taskData['슬라브 길이'],
        weight: taskData['중량'],
      }))
      setTaskDataListByExcel(taskDataList)
    }
  }

  return (
    <TablePageSearchBarBackground>
      <ItemDatePicker />
      <ItemSelectSearch selectLabel='항목' item={item} setItem={setItem} />
      <ItemTextSearch textLabel='검색' text={word} setText={setWord} />
      <ItemSelectSearch
        selectLabel='상세 검색 항목'
        item={detailItem}
        setItem={setDetailItem}
      />
      <ItemTextSearch
        textLabel='상세 검색'
        text={detailWord}
        setText={setDetailWord}
      />
      <FeatureButton
        feature='검색'
        variant='contained'
        color='white'
        backgroundColor='#13243A'
        icon={<Search />}
        width='82px'
        padding='0 15px'
        label={false}
        buttonPerformance={() => {}}
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
