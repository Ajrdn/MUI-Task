import React from 'react'
import dayjs from 'dayjs'
import TableAddModalDataStore from 'store/TableAddModalDataStore'
import TaskDataListStore from 'store/TaskDataListStore'
import Button from '@mui/material/Button'


function TableAddFormButton() {
  const addTaskDataDateListByObject = TaskDataListStore(state => state.addTaskDataDateListByObject)

  const setOpen = TableAddModalDataStore(state => state.setOpen)

  const workDate = TableAddModalDataStore(state => state.workDate)
  const setWorkDate = TableAddModalDataStore(state => state.setWorkDate)

  const lotNo = TableAddModalDataStore(state => state.lotNo)
  const setLotNo = TableAddModalDataStore(state => state.setLotNo)
  
  const variety = TableAddModalDataStore(state => state.variety)
  const setVariety = TableAddModalDataStore(state => state.setVariety)
  
  const standard = TableAddModalDataStore(state => state.standard)
  const setStandard = TableAddModalDataStore(state => state.setStandard)
  
  const length = TableAddModalDataStore(state => state.length)
  const setLength = TableAddModalDataStore(state => state.setLength)
  
  const weight = TableAddModalDataStore(state => state.weight)
  const setWeight = TableAddModalDataStore(state => state.setWeight)

  const tableAdd = () => {
    addTaskDataDateListByObject({
      workDate,
      lotNo,
      variety,
      standard,
      length,
      weight,
    })
    setWorkDate(dayjs())
    setLotNo('')
    setVariety('')
    setStandard('')
    setLength('')
    setWeight('')
    setOpen()
  }

  return (
    <Button
      disabled={lotNo === '' || variety === '' || standard === '' || length === '' || variety === '' ? true : false}
      variant='outlined'
      onClick={tableAdd}
      sx={{
        width: '98px',
        height: '40px',
        borderRadius: '5px',
        borderColor: '#13243A',
        color: '#13243A',
        fontSize: '15px',
        textAlign: 'center',
        fontFamily: 'Pretendard',
        fontWeight: 500,
        '&:hover': {
          borderColor: '#13243A',
        },
      }}
    >
      저장
    </Button>
  )
}

export default TableAddFormButton
