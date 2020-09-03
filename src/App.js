import React from 'react';
import {
  ThemeProvider,
  createMuiTheme,
  CssBaseline
} from '@material-ui/core';
import MainFeedPage from './components/MainFeedPage';
import { getItem, setItem, checkItem } from './utils/localstorageHandler';

function App() {

  // If color does not exist, read from palette.json and save the result to 
  // local storage
  const colors = checkItem('colors') ? getItem('colors', true) : require('./configs/palette.json');

  // If feedlist does not exist, read from feedlist.json and save the result to
  // local storage
  if (!checkItem('feedlist')) {
    setItem('feedlist', require('./configs/feedlist.json'), true);
  }

  const { backgroundDefault, backgroundPaper, primaryMain } = colors;

  return (
    <ThemeProvider 
      theme={createMuiTheme({
        typography: { fontFamily: 'Arial' },
        palette: {
          background: {
            default: backgroundDefault,
            paper: backgroundPaper,
          },
          primary: { main: primaryMain },
        }
      })}
    >
      <CssBaseline />
      <MainFeedPage/>
    </ThemeProvider>
  );
}

export default App;
