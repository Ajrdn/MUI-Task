import React from 'react'
import { styled, ThemeProvider } from '@mui/material/styles'
import { theme } from './theme/theme'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import Add from '@mui/icons-material/Add'
import TablePage from './pages/TablePage'


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
        <TablePage />
      </PageBackground>
      <Fab sx={{
        bgcolor: '#13243A',
        position: 'absolute',
        right: '30px',
        bottom: '200px',
        boxShadow: '0px 5px 6px #00000061'
      }}>
        <Add sx={{
          color: 'white',
        }}/>
      </Fab>
    </ThemeProvider>
  )
}

export default App
