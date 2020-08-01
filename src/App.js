import React from 'react';
import {
  ThemeProvider,
  createMuiTheme,
  CssBaseline
} from '@material-ui/core';
import 'typeface-muli';
import MainFeedPage from './components/MainFeedPage';
import { getItem, setItem, checkItem } from './utils/localstorageHandler';

function App() {

  // If color does not exist, read from palette.json and save the result to 
  // local storage
  let colors;
  if (checkItem('colors')) {
    colors = getItem('colors', true);
  } else {
    colors = require('./configs/palette.json');
    setItem('colors', colors, true);
  }

  // If feedlist does not exist, read from feedlist.json and save the result to
  // local storage
  if (!checkItem('feedlist')) {
    setItem('feedlist', require('./configs/feedlist.json'), true);
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
