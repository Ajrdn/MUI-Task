import { createTheme } from '@mui/material/styles'
import { outlinedInputClasses } from '@mui/material/OutlinedInput'


export const theme = createTheme({
  palette: {
    primary: {
      main: '#f8f8f8',
    },
    secondary: {
      main: '#f8f8f8',
    },
  },
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            color: '#878787',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& label.Mui-focused': {
            color: '#878787',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: '#C8C8C8',
        },
        root: {
          height: '38px',
          color: '#C8C8C8',
          [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: '#C8C8C8',
          },
          [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: '#C8C8C8',
          },
        },
        input: {
          paddingTop: 0,
          paddingBottom: 0,
        },
      },
    },
  },
})
