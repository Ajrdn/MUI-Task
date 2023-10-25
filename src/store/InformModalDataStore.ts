import { create } from 'zustand'


interface InformModalDataState {
  open: boolean
  title: string
  content: string
  target: string

  setOpen: () => void
  
  setTitle: (newTitle: string) => void

  setContent: (newContent: string) => void

  setTarget: (newTarget: string) => void
}


const InformModalDataStore = create<InformModalDataState>(set => ({
  open: false,
  title: '',
  content: '',
  target: '',

  setOpen: () => set(state => ({open: !state.open})),

  setTitle: newTitle => set(state => ({title: newTitle})),

  setContent: newContent => set(state => ({content: newContent})),

  setTarget: newTarget => set(state => ({target: newTarget})),
}))

export default InformModalDataStore
