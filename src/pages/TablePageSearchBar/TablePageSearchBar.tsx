import React from 'react'
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
import TableSearchStore from 'store/TableSearchStore'
import TaskDataListStore from 'store/TaskDataListStore'
import { TaskDataListDownloadXlsx } from 'utils/utils'


const TablePageSearchBarBackground = styled(Box)({
  width: '1520px',
  display: 'flex',
  gap: '12px',
})


const TablePageSearchBar = () => {
  const item = TableSearchStore(state => state.searchItem)
  const setItem = TableSearchStore(state => state.setSearchItem)
  const word = TableSearchStore(state => state.searchWord)
  const setWord = TableSearchStore(state => state.setSearchWord)

  const detailItem = TableSearchStore(state => state.searchDetailItem)
  const setDetailItem = TableSearchStore(state => state.setSearchDetailItem)
  const detailWord = TableSearchStore(state => state.searchDetailWord)
  const setDetailWord = TableSearchStore(state => state.setSearchDetailWord)

  const taskDataTitleList: string[] = TaskDataListStore(state => state.taskDataTitleList)
  const taskDataList: TaskData[] = TaskDataListStore(state => state.taskDataList)

  const excelDownload = () => {
    TaskDataListDownloadXlsx(taskDataTitleList, taskDataList)
  }

  return (
    <TablePageSearchBarBackground>
      <ItemDatePicker />
      <ItemSelectSearch
        selectLabel='항목'
        item={item}
        setItem={setItem}
      />
      <ItemTextSearch
        textLabel='검색'
        text={word}
        setText={setWord}
      />
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
        performance={() => {}}
      />
      <FeatureButton
        feature='액셀 다운로드'
        variant='contained'
        color='white'
        backgroundColor='#42A5F5'
        icon={<DownloadForOffline />}
        width='127px'
        padding='0 10px'
        performance={excelDownload}
      />
      <FeatureButton
        feature='액셀 업로드'
        variant='outlined'
        color='#42A5F5'
        backgroundColor='#42A5F5'
        icon={<CloudUpload />}
        width='113px'
        padding='0 10px'
        performance={() => {}}
      />
    </TablePageSearchBarBackground>
  )
}

export default TablePageSearchBar
