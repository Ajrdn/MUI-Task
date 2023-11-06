import React from 'react'
import dayjs from 'dayjs'
import TableAddModalDataStore from 'store/TableAddModalDataStore'
import MeltingDataListStore from 'store/MeltingDataListStore'
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import MeltingTableData from 'interface/MeltingTableData'


const AddButton = styled(Button)({
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
})


function TableAddFormButton() {
  const setMeltingTableDataDateList = MeltingDataListStore(state => state.setMeltingTableDataDateList)

  const searchDate = MeltingDataListStore(state => state.searchDate)

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
    .then((response) => response.json())
    .then((taskDataDateList: MeltingTableData[]) => {
      setMeltingTableDataDateList(taskDataDateList)
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
    <AddButton
      disabled={lotNo === '' || variety === '' || standard === '' || length === '' || variety === ''}
      variant='outlined'
      onClick={tableAdd}
    >
      저장
    </AddButton>
  )
}

export default TableAddFormButton
