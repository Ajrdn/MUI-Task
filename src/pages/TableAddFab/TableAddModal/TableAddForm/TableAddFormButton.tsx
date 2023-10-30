import React from 'react'
import dayjs from 'dayjs'
import TableAddModalDataStore from 'store/TableAddModalDataStore'
import TaskDataListStore from 'store/TaskDataListStore'
import TableSearchStore from 'store/TableSearchStore'
import Button from '@mui/material/Button'
import { TaskDataClient, TaskDataServer } from 'interface/TaskData'


function TableAddFormButton() {
  const {
    setTaskDataDateList,
  } = TaskDataListStore()

  const {
    searchDate,
    setSearchItem,
    setSearchWord,
    setSearchDetailItem,
    setSearchDetailWord,
  } = TableSearchStore()

  const {
    setOpen,
    workDate,
    setWorkDate,
    lotNo,
    setLotNo,
    variety,
    setVariety,
    standard,
    setStandard, length,
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
    .then((data: TaskDataServer[]) => {
      const taskDataDateList: TaskDataClient[] = data.map(taskData => ({
        workDate: dayjs(taskData.workDate),
        lotNo: taskData.lotNo,
        variety: taskData.variety,
        standard: taskData.standard,
        length: taskData.length,
        weight: taskData.weight,
      }))

      setSearchItem('전체')
      setSearchWord('')
      setSearchDetailItem('전체')
      setSearchDetailWord('')
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
