import React from 'react'
import { styled, ThemeProvider } from '@mui/material/styles'
import { theme } from './theme/theme'
import TablePage from './pages/TablePage'
import Box from '@mui/material/Box'


const PageBackground = styled(Box)({
  width: '100vw',
  height: '100vh',
  padding: '80px 0',
  display: 'flex',
  justifyContent: 'center',
})


function App() {
  return (
    <ThemeProvider theme={theme}>
      <PageBackground>
        <TablePage />
      </PageBackground>
    </ThemeProvider>
  )
}

export default App
