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


const TableBarBackground = styled(Box)({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
})


const TableBarButtonBox = styled(Box)({
  display: 'flex',
  gap: '12px',
})


interface TableBarProps<TableDataType> {
  date: Dayjs
  setDate: (date: Dayjs) => void
  tableDataShowListLength: number
  excelFunction: (tableDataExcelList: TableDataType[]) => void
  excelData: ExcelData[]
}


function TableBar<TableDataType>(props: TableBarProps<TableDataType>) {
  const excelDownload = () => {
    TableDataListDownloadXlsx(props.excelData)
  }

  const excelUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    TableDataListUploadXlsx<TableDataType>(event, props.date.format('YYYY-MM-DD'), props.excelFunction)
  }

  return (
    <TableBarBackground>
      <ItemDatePicker
        date={props.date}
        setDate={props.setDate}
      />
      <TableBarButtonBox>
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
      </TableBarButtonBox>
    </TableBarBackground>
  )
}

export default TableBar
