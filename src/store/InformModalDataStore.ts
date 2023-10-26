import { create } from 'zustand'


type Target = '생산관리' | '용해' | '슬라브 절단' | '슬라브 가열' | '가열 압연' | '전체 공정'


interface InformModalDataState {
  open: boolean
  title: string
  content: string
  target: Target

  setOpen: () => void
  
  setTitle: (newTitle: string) => void

  setContent: (newContent: string) => void

  setTarget: (newTarget: Target) => void
}


const InformModalDataStore = create<InformModalDataState>(set => ({
  open: false,
  title: '',
  content: '',
  target: '전체 공정',

  setOpen: () => set(state => ({open: !state.open})),

  setTitle: newTitle => set(state => ({title: newTitle})),

  setContent: newContent => set(state => ({content: newContent})),

  setTarget: newTarget => set(state => ({target: newTarget})),
}))

export default InformModalDataStore
