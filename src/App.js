import React  from 'react'
import {BrowserRouter} from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles';

import MainRouter from './MainRouter.js'
import theme from './theme.js'



const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme} >
        <MainRouter />
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
