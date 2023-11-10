import React, { useState, useEffect } from 'react'
import { Dayjs } from 'dayjs'
import { styled } from '@mui/material/styles'
import FilterAlt from '@mui/icons-material/FilterAlt'
import IconButton from '@mui/material/IconButton'
import Modal from '@mui/material/Modal'
import TextField from '@mui/material/TextField'
import ModalContentBox from 'components/ModalContentBox/ModalContentBox'


const TableDataFilterModalBackground = styled(Modal)({
  '.MuiModal-backdrop': {
    backgroundColor: 'transparent',
  },
})


interface TableDataFilterModalBackgroundProps {
  top: number
  left: number
}


const TableDataFilterModalContentBox = styled(ModalContentBox)<TableDataFilterModalBackgroundProps>(({ top, left }) => ({
  top: `${top}px`,
  left: `${left}px`,
  borderRaius: '4px',
  width: '209px',
  height: '61px',
  padding: '16px 12px 7px',
  backgroundColor: 'white',
  boxShadow: '0px 0px 5px #444',
  justifyContent: 'center',
  outline: 'none',
}))


const FilterTextField = styled(TextField)({
  '& input': {
    fontSize: '16px',
    fontFamily: 'Pretendard',
    fontWeight: 400,
    color: '#13243A',
  },
  '& input::placeholder': {
    fontSize: '16px',
    fontFamily: 'Pretendard',
    fontWeight: 400,
    color: '#C8C8C8',
  },
  '& label': {
    fontFamily: 'Pretendard',
    fontWeight: 600,
    color: '#878787',
  },
})


interface TableDataFilterButtonProps {
  date: Dayjs
  setFilterData: (newFilterData: string) => void
}


function TableDataFilterButton(props: TableDataFilterButtonProps) {
  const [data, setData] = useState<string>('')
  const [unchanged, setUnchanged] = useState<boolean>(true)
  const [open, setOpen] = useState<boolean>(false)
  const [top, setTop] = useState<number>(0)
  const [left, setLetf] = useState<number>(0)

  useEffect(() => {
    if(data !== '') {
      setData('')
    }
  }, [props.date])

  const openFilterField = (event: React.MouseEvent<HTMLElement>) => {
    setTop(event.currentTarget.getBoundingClientRect().top + 30)
    setLetf(event.currentTarget.getBoundingClientRect().left + 10)
    setOpen(prev => !prev)
  }

  const closeFilterField = () => {
    if(unchanged) {
      props.setFilterData('')
      setData('')
    } else props.setFilterData(data)
    setOpen(prev => !prev)
    setUnchanged(true)
  }

  const DataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUnchanged(false)
    setData(event.target.value)
  }

  const onPressEnter = (event: React.KeyboardEvent) => {
    if(event.key === 'Enter') {
      closeFilterField()
    }
  }

  return (
    <>
      <IconButton
        onClick={openFilterField}
        disableFocusRipple
      >
        <FilterAlt
          sx={{
            width: '10px',
            height: '10px',
            color: '#13243A',
          }}
        />
      </IconButton>
      <TableDataFilterModalBackground
        open={open}
        onClose={closeFilterField}
      >
        <TableDataFilterModalContentBox
          top={top}
          left={left}
        >
          <FilterTextField
            focused
            label='검색어 입력'
            placeholder='검색어 입력'
            value={data}
            onChange={DataChange}
            onKeyUp={onPressEnter}
          />
        </TableDataFilterModalContentBox>
      </TableDataFilterModalBackground>
    </>
  )
}

export default TableDataFilterButton
