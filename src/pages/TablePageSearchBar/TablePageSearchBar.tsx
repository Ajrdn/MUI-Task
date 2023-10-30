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
import DetailItemSelectSearch from './DetailItemSelectSearch'
import DetailItemTextSearch from './DetailItemTextSearch'
import { MenuTitle, MenuValue } from 'interface/SearchMenu'
import { TABLE_HEADER_LIST } from 'interface/TableHeader'
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
    searchItem,
    setSearchItem,
    searchWord,
    setSearchWord,
    searchDetailItem,
    setSearchDetailItem,
    searchDetailWord,
    setSearchDetailWord,
  } = TableSearchStore()

  const {
    taskDataShowList,
    taskDataDateList,
    setTaskDataDateList,
    setTaskDataShowList,
    setTaskDataShowListBySearchData,
  } = TaskDataListStore()

  const excelDownload = () => {
    TaskDataListDownloadXlsx(TABLE_HEADER_LIST.map(tableHeader => tableHeader.title), taskDataShowList)
  }

  const excelUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    TaskDataListUploadXlsx(event, searchDate.format('YYYY-MM-DD'), setTaskDataDateList)

    setSearchItem('전체')
    setSearchWord('')
    setSearchDetailItem('전체')
    setSearchDetailWord('')
  }

  const searchData = () => {
    const select = searchMenuTitleTranslate(searchItem)
    const detailSelect = searchMenuTitleTranslate(searchDetailItem)

    if(select !== 'All' && detailSelect !== 'All') setTaskDataShowListBySearchData(select, searchWord, detailSelect, searchDetailWord)
    else if(select !== 'All' && detailSelect === 'All') setTaskDataShowListBySearchData(select, searchWord)
    else setTaskDataShowList(taskDataDateList)
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
        disabled={(searchItem !== '전체' && searchWord === '') || (searchDetailItem !== '전체' && searchDetailWord === '')}
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
