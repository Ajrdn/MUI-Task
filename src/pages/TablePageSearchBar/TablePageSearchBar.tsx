import React from 'react'
import { styled } from '@mui/material/styles'
import DownloadForOffline from '@mui/icons-material/DownloadForOffline'
import CloudUpload from '@mui/icons-material/CloudUpload'
import Box from '@mui/material/Box'
import ItemDatePicker from './ItemDatePicker'
import FeatureButton from './FeatureButton'
import { TableDataListDownloadXlsx, TableDataListUploadXlsx } from 'utils/utils'
import { Dayjs } from 'dayjs'
import ExcelData from 'interface/ExcelData'


const TablePageSearchBarBackground = styled(Box)({
  width: '1520px',
  display: 'flex',
  justifyContent: 'space-between',
})


const TablePageSearchBarButtonBox = styled(Box)({
  display: 'flex',
  gap: '12px',
})


interface TablePageSearchBarProps<TableDataType, ExcelDataType> {
  date: Dayjs
  setDate: (date: Dayjs) => void
  tableDataShowListLength: number
  setTableDataDateList: (newTableDataDateList: TableDataType[]) => void
  excelData: ExcelData[]
  dataConverter: (excelData: ExcelDataType[]) => TableDataType[]
}


function TablePageSearchBar<TableDataType, ExcelDataType>(props: TablePageSearchBarProps<TableDataType, ExcelDataType>) {
  const excelDownload = () => {
    TableDataListDownloadXlsx(props.excelData)
  }

  const excelUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    TableDataListUploadXlsx<TableDataType, ExcelDataType>(event, props.date.format('YYYY-MM-DD'), props.setTableDataDateList, props.dataConverter)
  }

  return (
    <TablePageSearchBarBackground>
      <ItemDatePicker
        date={props.date}
        setDate={props.setDate}
      />
      <TablePageSearchBarButtonBox>
        <FeatureButton
          feature='액셀 다운로드'
          variant='contained'
          color='white'
          backgroundColor='#42A5F5'
          icon={<DownloadForOffline />}
          width='127px'
          padding='0 10px'
          disabled={props.tableDataShowListLength === 0}
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
      </TablePageSearchBarButtonBox>
    </TablePageSearchBarBackground>
  )
}

export default TablePageSearchBar
