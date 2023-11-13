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
import { SNACKBAR_ERROR, SNACKBAR_SUCCESS } from 'constant/Snackbar_Options'
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
  copyFunction?: (tableData: TableDataType) => Promise<void>
  modifyFunction?: (tableData: TableDataType) => Promise<void>
  deleteFunction?: (tableData: TableDataType) => Promise<void>
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
    if(props.copyFunction) {
      props.copyFunction(props.tableRowData.tableData)
      .then(() => {
        enqueueSnackbar('복제되었습니다!', SNACKBAR_SUCCESS)
      })
      .catch(error => {
        enqueueSnackbar('오류가 발생했습니다.', SNACKBAR_ERROR)
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
    if(props.modifyFunction) {
      props.modifyFunction(tableRowData)
      .then(() => {
        enqueueSnackbar('수정되었습니다!', SNACKBAR_SUCCESS)
      })
      .catch(error => {
        enqueueSnackbar('오류가 발생했습니다.', SNACKBAR_ERROR)
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
      {props.copyFunction &&
        <TableFunctionCell align='center'>
          <IconButton onClick={copyFunction}>
            <CopyAll />
          </IconButton>
        </TableFunctionCell>
      }
      {props.modifyFunction &&
        <TableFunctionCell align='center'>
          <Button
            variant='text'
            onClick={openModify ? saveFunction : openModifyFunction}
          >
            {openModify ? '저장' : '수정'}
          </Button>
        </TableFunctionCell>
      }
      {props.deleteFunction &&
        <TableFunctionCell align='center'>
          <IconButton onClick={() => setOpen(true)}>
            <DeleteOutline />
          </IconButton>
          <DeleteDialog<TableDataType>
            open={open}
            setOpen={setOpen}
            tableRowData={props.tableRowData}
            deleteFunction={props.deleteFunction}
          />
        </TableFunctionCell>
      }
    </TableRow>
  )
}

export default TableDataRow
