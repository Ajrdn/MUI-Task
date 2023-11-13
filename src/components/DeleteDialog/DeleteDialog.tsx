import React from 'react'
import { styled } from '@mui/material/styles'
import { useSnackbar } from 'notistack'
import ErrorOutline from '@mui/icons-material/ErrorOutline'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import TableRowData from 'interface/TableRowData'
import { SNACKBAR_ERROR, SNACKBAR_SUCCESS } from 'constant/Snackbar_Options'
import ModalCloseButton from 'components/ModalCloseButton/ModalCloseButton'


const DeleteDialogBackground = styled(Dialog)({
  backdropFilter: 'blur(3px)',
  '& .MuiPaper-root': {
    backgroundColor: 'transparent',
    borderRadius: '4px',
    width: '337px',
    height: '101px',
  },
})


const DeleteDialogContent = styled(DialogContent)({
  backgroundColor: '#FF5F57',
  borderColor: '#FF5F57',
  display: 'flex',
  gap: '14px',
})


const DeleteDialogContentText = styled(DialogContentText)({
  color: 'white',
  fontSize: '14px',
  fontFamily: 'Pretendard',
  fontWeight: 500,
})


const DeleteDialogActions = styled(DialogActions)({
  padding: '0 32px',
  backgroundColor: '#FF5F57',
})


const DeleteButton = styled(Button)({
  color: 'white',
  fontSize: '14px',
  fontFamily: 'Pretendard',
  fontWeight: 500,
})


interface DeleteDialogProps<TableDataType> {
  open: boolean
  setOpen: (newOpen: boolean) => void
  tableRowData: TableRowData<TableDataType>
  deleteFunction?: (tableData: TableDataType) => Promise<void>
}


function DeleteDialog<TableDataType>(props: DeleteDialogProps<TableDataType>) {
  const { enqueueSnackbar } = useSnackbar()

  const deleteFunction = () => {
    if(props.deleteFunction) {
      props.deleteFunction(props.tableRowData.tableData)
      .then(() => {
        enqueueSnackbar('삭제되었습니다!', SNACKBAR_SUCCESS)
      })
      .catch(error => {
        enqueueSnackbar('오류가 발생했습니다.', SNACKBAR_ERROR)
      })
      .finally(() => {
        props.setOpen(false)
      })
    }
  }

  return (
    <DeleteDialogBackground
      open={props.open}
      onClose={() => props.setOpen(false)}
    >
      <DeleteDialogContent>
        <ErrorOutline sx={{ color: 'white' }} />
        <DeleteDialogContentText>
          삭제되면 더 이상 복구가 되지 않습니다.
          <br />
          정말로 삭제하시겠습니까?
        </DeleteDialogContentText>
      </DeleteDialogContent>
      <DeleteDialogActions disableSpacing>
        <DeleteButton
          variant='text'
          onClick={deleteFunction}
        >
          예
        </DeleteButton>
        <DeleteButton
          variant='text'
          onClick={() => props.setOpen(false)}
        >
          아니오
        </DeleteButton>
      </DeleteDialogActions>
      <ModalCloseButton
        size='14px'
        position='25px'
        color='white'
        onClick={() => props.setOpen(false)}
      />
    </DeleteDialogBackground>
  )
}

export default DeleteDialog
