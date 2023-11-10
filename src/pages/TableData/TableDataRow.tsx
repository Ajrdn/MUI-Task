import React, { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles'
import { useSnackbar } from 'notistack'
import CopyAll from '@mui/icons-material/CopyAll'
import DeleteOutline from '@mui/icons-material/DeleteOutline'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import TableRowData from 'interface/TableRowData'
import SNACKBAR_OPTIONS from 'constant/Snackbar_Options'
import DeleteDialog from 'components/DeleteDialog/DeleteDialog'
import TableDataCell from './TableDataCell'


const TableFunctionCell = styled(TableCell)({
  width: '64px',
  '& button': {
    color: '#0F3D7A',
    fontSize: '15px',
    fontFamily: 'Pretendard',
    fontWeight: 500,
  },
})


interface TableDataRowProps<TableDataType> {
  tableRowData: TableRowData<TableDataType>
  no?: boolean
  clickTableRow?: (index: number) => void
  setTableDataDateList: (newTableDataDateList: TableDataType[]) => void
  copyUrl?: string
  copyMethod?: string
  modifyUrl?: string
  modifyMethod?: string
  deleteUrl?: string
  deleteMethod?: string
}


function TableDataRow<TableDataType>(props: TableDataRowProps<TableDataType>) {
  const [open, setOpen] = useState<boolean>(false)
  const [openModify, setOpenModify] = useState<boolean>(false)
  const [tableRowData, setTableRowData] = useState<TableDataType>(props.tableRowData.tableData)

  useEffect(() => {
    setTableRowData(props.tableRowData.tableData)
  }, [props.tableRowData.tableData])

  const { enqueueSnackbar } = useSnackbar()
  
  const selectCell = () => {
    if(openModify) return
    props.clickTableRow!(props.tableRowData.index)
  }

  const copyFunction = () => {
    if(props.copyUrl && props.copyMethod) {
      fetch(props.copyUrl, {
        method: props.copyMethod,
        body: JSON.stringify(props.tableRowData.tableData),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => response.json())
      .then((tableDataDateList: TableDataType[]) => {
        props.setTableDataDateList(tableDataDateList)
        enqueueSnackbar('복제되었습니다!', {
          ...SNACKBAR_OPTIONS,
          variant: 'success',
        })
      })
      .catch(error => {
        enqueueSnackbar('오류가 발생했습니다.', {
          ...SNACKBAR_OPTIONS,
          variant: 'error',
        })
      })
    }
  }

  const openModifyFunction = () => {
    setOpenModify(true)
  }

  const modifyFunction = (newData: string, key: keyof TableDataType) => {
    setTableRowData(preTableRowData => ({
      ...preTableRowData,
      [key]: newData,
    }))
  }

  const saveFunction = () => {
    if(props.modifyUrl && props.modifyMethod) {
      fetch(props.modifyUrl, {
        method: props.modifyMethod,
        body: JSON.stringify(tableRowData),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => response.json())
      .then((tableDataDateList: TableDataType[]) => {
        props.setTableDataDateList(tableDataDateList)
        enqueueSnackbar('수정되었습니다!', {
          ...SNACKBAR_OPTIONS,
          variant: 'success',
        })
      })
      .catch(error => {
        enqueueSnackbar('오류가 발생했습니다.', {
          ...SNACKBAR_OPTIONS,
          variant: 'error',
        })
      })
    }
    setOpenModify(false)
  }

  return (
    <TableRow
      sx={{
        '&:last-child > *': {
          borderBottom: 'none',
        },
      }}
    >
      {props.no && (
        <TableDataCell
          data={(props.tableRowData.index + 1).toString()}
          selected={props.tableRowData.selected}
          selectCell={props.clickTableRow ? selectCell : undefined}
          openModify={openModify}
        />
      )}
      {props.tableRowData.tableRowStringData.map((cellData, index) => (
        <TableDataCell<TableDataType>
          key={`${cellData}${index}`}
          data={cellData.data}
          dataKey={cellData.key}
          modifyFunction={cellData.key ? modifyFunction : undefined}
          selected={props.tableRowData.selected}
          selectCell={props.clickTableRow ? selectCell : undefined}
          openModify={openModify}
        />
      ))}
      {props.copyUrl &&
        <TableFunctionCell align='center'>
          <IconButton onClick={copyFunction}>
            <CopyAll />
          </IconButton>
        </TableFunctionCell>
      }
      {props.modifyUrl &&
        <TableFunctionCell align='center'>
          <Button
            variant='text'
            onClick={openModify ? saveFunction : openModifyFunction}
          >
            {openModify ? '저장' : '수정'}
          </Button>
        </TableFunctionCell>
      }
      {props.deleteUrl &&
        <TableFunctionCell align='center'>
          <IconButton onClick={() => setOpen(true)}>
            <DeleteOutline />
          </IconButton>
          <DeleteDialog<TableDataType>
            open={open}
            setOpen={setOpen}
            tableRowData={props.tableRowData}
            setTableDataDateList={props.setTableDataDateList}
            deleteUrl={props.deleteUrl}
            deleteMethod={props.deleteMethod}
          />
        </TableFunctionCell>
      }
    </TableRow>
  )
}

export default TableDataRow
