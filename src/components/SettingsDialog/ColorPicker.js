import React, { Component } from 'react';
import { ChromePicker } from 'react-color';
import { Grid, Typography, Button } from '@material-ui/core';
import { getItem } from '../../utils/localstorageHandler';

/**
 * An input component to pick a color
 */
export default class ColorPicker extends Component {
  
  constructor(props) {
    super(props);

    // Fetch the value from local storage
    let initialValue = null;
    if (getItem('colors')) {
      initialValue = getItem('colors')[this.props.field];
    }

    this.state = {
      field: this.props.field,
      focused: false,
      value: initialValue ? initialValue : ''
    }
  }

  render() {
    return (
      <Grid
        item
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={1}
        style={{
          marginBottom: '5px'
        }}
      >
        <Grid item>
          <Typography
            variant="body1"
            style={{
              color: '#8b96a4'
            }}
          >
            {this.state.field + ' : '}
          </Typography>
        </Grid>
        <Grid item>
          <Button
            style={{
              // TODO: Set background color as the current value
              backgroundColor: '#fff'
            }}
          />
        </Grid>
      </Grid>
    )
  }
}
