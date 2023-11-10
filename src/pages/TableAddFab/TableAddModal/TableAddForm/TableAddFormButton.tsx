import React from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import MeltingData from 'interface/MeltingData'


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


interface TableAddFormButtonProps {
  setMeltingTableDataList: (newMeltingTableDataList: MeltingData[]) => void
  setOpen: (newOpen: boolean) => void
  workDate: Dayjs
  lotNo: string
  variety: string
  standard: string
  length: string
  weight: string
  setWorkDate: (newWorkDate: Dayjs) => void
  setLotNo: (newLotNo: string) => void
  setVariety: (newVariety: string) => void
  setStandard: (newStandard: string) => void
  setLength: (newLength: string) => void
  setWeight: (newWeight: string) => void
}


function TableAddFormButton(props: TableAddFormButtonProps) {
  const tableAdd = () => {
    fetch(`http://localhost:8000/taskDataList/${props.workDate.format('YYYY-MM-DD')}`, {
      method: 'POST',
      body: JSON.stringify({
        workDate: props.workDate.format('YYYY-MM-DD'),
        lotNo: props.lotNo,
        variety: props.variety,
        standard: props.standard,
        length: props.length,
        weight: props.weight,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then((taskDataDateList: MeltingData[]) => {
      props.setMeltingTableDataList(taskDataDateList)
      props.setWorkDate(dayjs())
      props.setLotNo('')
      props.setVariety('')
      props.setStandard('')
      props.setLength('')
      props.setWeight('')
      props.setOpen(false)
    })
  }

  return (
    <AddButton
      disabled={props.lotNo === '' || props.variety === '' || props.standard === '' || props.length === '' || props.variety === ''}
      variant='outlined'
      onClick={tableAdd}
    >
      저장
    </AddButton>
  )
}

export default TableAddFormButton
