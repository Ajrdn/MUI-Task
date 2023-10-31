import React from 'react'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'


export interface TableSnackbarProps {
  open: boolean
  severity: 'success' | 'info' | 'warning' | 'error'
  message: string
  onClose: () => void
}


function TableSnackbar(props: TableSnackbarProps) {
  return (
    <Snackbar
      open={props.open}
      autoHideDuration={3000}
      onClose={props.onClose}
    >
      <Alert severity={props.severity}>{props.message}</Alert>
    </Snackbar>
  )
}

export default TableSnackbar
