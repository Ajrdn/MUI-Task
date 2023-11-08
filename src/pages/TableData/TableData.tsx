import React, { useState } from 'react'
import { Dayjs } from 'dayjs'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import Box from '@mui/material/Box'
import { useSnackbar } from 'notistack'
import TableHeader from 'interface/TableHeader'
import TableRowData from 'interface/TableRowData'
import SNACKBAR_OPTIONS from 'constant/Snackbar_Options'
import TableDataHeader from './TableDataHeader'
import TableDataBody from './TableDataBody'


interface TableDataProps<TableDataType> {
  date: Dayjs
  tableHeaderList: TableHeader[]
  tableDataShowList: TableRowData<TableDataType>[]
  setTableDataShowList: (newTableDataShowList: TableRowData<TableDataType>[]) => void
  setTableDataDateList: (newTableDataDateList: TableDataType[]) => void
  pasteUrl: string
  pasteMethod: string
  filterFunction: () => void
  copy?: boolean
  copyUrl?: string
  copyMethod?: string
  modify?: boolean
  modifyUrl?: string
  modifyMethod?: string
  delete?: boolean
  deleteUrl?: string
  deleteMethod?: string
}


function TableData<TableDataType>(props: TableDataProps<TableDataType>) {
  const [tableDataPasteList, setTableDataPasteList] = useState<TableDataType[]>([])
  const { enqueueSnackbar } = useSnackbar()

  const copyData = (event: React.KeyboardEvent) => {
    if(event.ctrlKey && event.key === 'c') {
      const selectTableDataShowListLength = props.tableDataShowList.filter(tableDataShow => tableDataShow.selected).length
      if(selectTableDataShowListLength > 0) {
        enqueueSnackbar('성공적으로 복사되었습니다!', {
          ...SNACKBAR_OPTIONS,
          variant: 'success',
        })
        copyMeltingTableData()
      } else {
        enqueueSnackbar('복사할 데이터가 선택되지 않았습니다.', {
          ...SNACKBAR_OPTIONS,
          variant: 'warning',
        })
      }
    } else if(event.ctrlKey && event.key === 'v') {
      if(tableDataPasteList.length > 0) {
        const tableDataList: TableDataType[] = tableDataPasteList.map(tableData => {
          return {
            ...tableData,
            workDate: props.date.format('YYYY-MM-DD'),
          }
        })
        fetch(props.pasteUrl, {
          method: props.pasteMethod,
          body: JSON.stringify(tableDataList),
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(response => response.json())
        .then((tableDataDateList: TableDataType[]) => {
          props.setTableDataDateList(tableDataDateList)
        })
        .finally(() => {
          enqueueSnackbar('성공적으로 붙여넣었습니다!', {
            ...SNACKBAR_OPTIONS,
            variant: 'success',
          })
        })
      } else {
        enqueueSnackbar('붙여넣기할 데이터가 선택되지 않았습니다.', {
          ...SNACKBAR_OPTIONS,
          variant: 'warning',
        })
      }
    }
  }

  const clearTableDataShowList = () => {
    props.setTableDataShowList(props.tableDataShowList.map(meltingTableData => ({
      ...meltingTableData,
      selected: false,
    })))
  }

  const copyMeltingTableData = () => {
    setTableDataPasteList(props.tableDataShowList.filter(tableDataShow => tableDataShow.selected).map(tableDataShow => tableDataShow.tableData))
    clearTableDataShowList()
  }

  const clickTableRow = (index: number) => {
    props.setTableDataShowList(props.tableDataShowList.map(tableDataShow => {
      if(index === tableDataShow.index) return {
        ...tableDataShow,
        selected: !tableDataShow.selected
      }
      return tableDataShow
    }))
  }

  return (
    <TableContainer
      component={Box}
      sx={{
        border: '1px solid #C8C8C8',
        borderRadius: '8px',
      }}
      onKeyUp={copyData}
      tabIndex={0}
      onBlur={clearTableDataShowList}
    >
      <Table stickyHeader>
        <TableDataHeader
          tableHeaderList={props.tableHeaderList}
          filterFunction={props.filterFunction}
          copy={props.copy}
          modify={props.modify}
          delete={props.delete}
        />
        <TableDataBody<TableDataType>
          clickTableRow={clickTableRow}
          tableDataShowList={props.tableDataShowList}
          setTableDataDateList={props.setTableDataDateList}
          copy={props.copy}
          copyUrl={props.copyUrl}
          copyMethod={props.copyMethod}
          modify={props.modify}
          modifyUrl={props.modifyUrl}
          modifyMethod={props.modifyMethod}
          delete={props.delete}
          deleteUrl={props.deleteUrl}
          deleteMethod={props.deleteMethod}
        />
      </Table>
    </TableContainer>
  )
}

export default TableData
