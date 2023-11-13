import React from 'react'
import { styled, ThemeProvider } from '@mui/material/styles'
import { theme } from './theme/theme'
import Box from '@mui/material/Box'
import TableComponent from './pages/TableComponent'


const PageBackground = styled(Box)({
  boxSizing: 'border-box',
  width: '100vw',
  height: '100vh',
  padding: '80px 0',
  display: 'flex',
  justifyContent: 'center',
  position: 'relative',
})


function App() {
  return (
    <ThemeProvider theme={theme}>
      <PageBackground>
        <TableComponent />
      </PageBackground>
    </ThemeProvider>
  )
}

export default App
