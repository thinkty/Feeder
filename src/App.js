import React from 'react';
import {
  ThemeProvider,
  createMuiTheme,
  CssBaseline
} from '@material-ui/core';
import 'typeface-muli';
import MainFeedPage from './components/MainFeedPage';

function App() {

  // If color does not exist, read from palette.json and save the result to 
  // local storage
  let colors;
  if (localStorage.getItem('colors')) {
    colors = JSON.parse(localStorage.getItem('colors'));
  } else {
    colors = require('./configs/palette.json');
    localStorage.setItem('colors', JSON.stringify(colors));
  }

  return (
    <ThemeProvider 
      theme={createMuiTheme({
        typography: {
          fontFamily: 'Muli',
        },
        palette: colors.mui
      })}
    >
      <CssBaseline />
      <MainFeedPage/>
    </ThemeProvider>
  );
}

export default App;
