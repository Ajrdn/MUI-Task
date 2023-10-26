import { create } from 'zustand'


interface AlarmModalDataState {
  open: boolean
  title: string
  content: string

  setOpen: () => void

  setTitle: (newTitle: string) => void

  setContent: (newContent: string) => void
}


const AlarmModalDataStore = create<AlarmModalDataState>(set => ({
  open: false,
  title: '알람 없음',
  content: '아무런 알람도 오지 않았습니다.',

  setOpen: () => set(state => ({open: !state.open})),

  setTitle: newTitle => set(state => ({title: newTitle})),

  setContent: newContent => set(state => ({content: newContent})),
}))

export default AlarmModalDataStore
