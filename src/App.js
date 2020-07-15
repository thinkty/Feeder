import React from 'react';
import {
  ThemeProvider,
  createMuiTheme,
  CssBaseline
} from '@material-ui/core';
import 'typeface-muli';
import MainFeedPage from './components/MainFeedPage';
const palette = require('./configs/palette.json');

const theme = createMuiTheme({
  palette: palette.mui,
  typography: {
    fontFamily: 'Muli',
  },
  overrides: {
    MuiSelect: {
      root: {
        color: '#fff'
      },
      select: {
        color: '#fff'
      }
    }
  }
});

function App() {
  return (
    <ThemeProvider 
      theme={theme}
    >
      <CssBaseline />
      <MainFeedPage/>
    </ThemeProvider>
  );
}

export default App;
