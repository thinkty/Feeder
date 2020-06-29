import React from 'react';
import {
  ThemeProvider,
  createMuiTheme,
  CssBaseline
} from '@material-ui/core';
import 'typeface-muli';
import MainFeedPage from './components/MainFeedPage';
const palette = require('./configs/palette.json').palette;

const theme = createMuiTheme({
  palette: palette,
  typography: {
    fontFamily: 'Muli',
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
