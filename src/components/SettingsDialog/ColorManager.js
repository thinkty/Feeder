import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import ColorPicker from './ColorPicker';

/**
 * Component to edit colors
 */
export default function Editor() {
  const colors = [
    "background", 
    "primary", 
    "header", 
    "main", 
    "desc", 
    "title", 
    "author"
  ];

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      style={{
        marginTop: '100px'
      }}
    >
      {/* Colors */}
      <Grid item>
        <Typography
          variant="h5"
          style={{
            color: '#fdfdfc',
            marginBottom: '10px'
          }}
        >
          Colors
        </Typography>
      </Grid>
      <Grid item>
      {
        colors.map(field => {
          return (
            <ColorPicker 
              key={field}
              field={field}
            />
          );
        })
      }
      </Grid>
    </Grid>
  );
}
