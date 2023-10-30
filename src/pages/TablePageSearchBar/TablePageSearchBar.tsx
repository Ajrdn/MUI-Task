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
import { TaskDataClient } from 'interface/TaskData'
import TableHeader from 'interface/TableHeader'
import { MenuTitle, MenuValue } from 'interface/SearchMenu'
import TableSearchStore from 'store/TableSearchStore'
import TaskDataListStore from 'store/TaskDataListStore'
import { TaskDataListDownloadXlsx, TaskDataListUploadXlsx } from 'utils/utils'
import DetailItemSelectSearch from './DetailItemSelectSearch'
import DetailItemTextSearch from './DetailItemTextSearch'


const TablePageSearchBarBackground = styled(Box)({
  width: '1520px',
  display: 'flex',
  gap: '12px',
})


function TablePageSearchBar() {
  const item = TableSearchStore(state => state.searchItem)
  const detailItem = TableSearchStore(state => state.searchDetailItem)
  const word = TableSearchStore(state => state.searchWord)
  const detailWord = TableSearchStore(state => state.searchDetailWord)
  
  const taskDataTitleList: TableHeader[] = TaskDataListStore(state => state.taskDataTitleList)
  const taskDataShowList: TaskDataClient[] = TaskDataListStore(state => state.taskDataShowList)
  const taskDataDateList: TaskDataClient[] = TaskDataListStore(state => state.taskDataDateList)

  const setTaskDataListByList = TaskDataListStore(state => state.setTaskDataListByList)
  const setTaskDataShowListByList = TaskDataListStore(state => state.setTaskDataShowListByList)
  const setTaskDataShowListBySearchData = TaskDataListStore(state => state.setTaskDataShowListBySearchData)

  const excelDownload = () => {
    TaskDataListDownloadXlsx(taskDataTitleList.map(tableHeader => tableHeader.title), taskDataShowList)
  }

  const excelUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    TaskDataListUploadXlsx(event, setTaskDataListByList)
  }

  const searchData = () => {
    const select = searchMenuTitleTranslate(item)
    const detailSelect = searchMenuTitleTranslate(detailItem)

    if(select !== 'All' && detailSelect !== 'All') setTaskDataShowListBySearchData(select, word, detailSelect, detailWord)
    else if(select !== 'All' && detailSelect === 'All') setTaskDataShowListBySearchData(select, word)
    else setTaskDataShowListByList(taskDataDateList)
  }

  const searchMenuTitleTranslate = (title: MenuTitle): MenuValue | 'All' => {
    if(title === 'LOT No.') return 'lotNo'
    else if(title === '품종') return 'variety'
    else if(title === '규격') return 'standard'
    else if(title === '슬라브 길이') return 'length'
    else if(title === '중량') return 'weight'
    return 'All'
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
        disabled={(item !== '전체' && word === '') || (detailItem !== '전체' && detailWord === '')}
        label={false}
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
