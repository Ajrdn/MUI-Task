import { create } from 'zustand'


interface InformDataState {
  show: boolean
  title: string
  content: string
  target: string

  setShow: () => void
  
  setTitle: (newTitle: string) => void

  setContent: (newContent: string) => void

  setTarget: (newTarget: string) => void
}


const InformDataStore = create<InformDataState>(set => ({
  show: false,
  title: '',
  content: '',
  target: '',

  setShow: () => set(state => ({show: !state.show})),

  setTitle: newTitle => set(state => ({title: newTitle})),

  setContent: newContent => set(state => ({content: newContent})),

  setTarget: newTarget => set(state => ({target: newTarget})),
}))

export default InformDataStore
