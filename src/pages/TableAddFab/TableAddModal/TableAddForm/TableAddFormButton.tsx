import React from 'react'
import dayjs from 'dayjs'
import TableAddModalDataStore from 'store/TableAddModalDataStore'
import TaskDataListStore from 'store/TaskDataListStore'
import Button from '@mui/material/Button'
import TaskData from 'interface/TaskData'


function TableAddFormButton() {
  const setTaskDataDateList = TaskDataListStore(state => state.setTaskDataDateList)

  const searchDate = TaskDataListStore(state => state.searchDate)

  const {
    setOpen,
    workDate,
    setWorkDate,
    lotNo,
    setLotNo,
    variety,
    setVariety,
    standard,
    setStandard,
    length,
    setLength,
    weight,
    setWeight,
  } = TableAddModalDataStore()

  const tableAdd = () => {
    fetch(`http://localhost:8000/taskDataList/${searchDate.format('YYYY-MM-DD')}`, {
      method: 'POST',
      body: JSON.stringify({
        workDate: workDate.format('YYYY-MM-DD'),
        lotNo,
        variety,
        standard,
        length,
        weight,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then((taskDataDateList: TaskData[]) => {
      setTaskDataDateList(taskDataDateList)

      setWorkDate(dayjs())
      setLotNo('')
      setVariety('')
      setStandard('')
      setLength('')
      setWeight('')
      setOpen()
    })
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
