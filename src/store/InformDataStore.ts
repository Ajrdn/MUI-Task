import { create } from 'zustand'


interface InformDataState {
  show: boolean
  title: string
  content: string
  target: string

  setShow: (newShow: boolean) => void
  
  setTitle: (newTitle: string) => void

  setContent: (newContent: string) => void

  setTarget: (newTarget: boolean) => void
}


const InformDataStore = create<InformDataState>(set => ({
  show: false,
  title: '',
  content: '',
  target: '',


}))

export default InformDataStore
