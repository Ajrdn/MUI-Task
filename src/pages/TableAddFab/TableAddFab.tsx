import React, { useState } from 'react'
import Fab from '@mui/material/Fab'
import Add from '@mui/icons-material/Add'
import MeltingData from 'interface/MeltingData'
import TableAddModal from './TableAddModal/TableAddModal'


interface TableAddFabProps {
  setMeltingTableDataList: (newMeltingTableDataList: MeltingData[]) => void
}


function TableAddFab(props: TableAddFabProps) {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <>
      <Fab
        onClick={() => setOpen(true)}
        sx={{
          bgcolor: '#13243A',
          position: 'absolute',
          right: '30px',
          bottom: '200px',
          boxShadow: '0px 5px 6px #00000061',
          '&:hover': {
            backgroundColor: '#13243A',
          }
        }}
      >
        <Add
          sx={{
            color: 'white',
          }}
        />
      </Fab>
      <TableAddModal
        open={open}
        setOpen={setOpen}
        setMeltingTableDataList={props.setMeltingTableDataList}
      />
    </>
  )
}

export default TableAddFab
