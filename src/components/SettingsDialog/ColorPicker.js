import React, { Component } from 'react';
import { Grid, Typography, Button } from '@material-ui/core';
import { getItem, checkItem } from '../../utils/localstorageHandler';

const palette = require('../../configs/palette.json');
const map = {
  background: 'backgroundDefault',
  primary: 'primaryMain',
  header: 'textHeader',
  main: 'textMain',
  desc: 'textFeedDesc',
  title: 'textFeedcardTitle',
  author: 'textFeedcardAuthorAndDate'
};

/**
 * An input component to pick a color
 */
export default class ColorPicker extends Component {
  
  constructor(props) {
    super(props);

    // Fetch the value from local storage
    let initialValue = null;
    if (checkItem('colors')) {
      initialValue = getItem('colors', true)[map[this.props.field]];
    } else {
      initialValue = palette[map[this.props.field]];
    }

    this.state = {
      field: this.props.field,
      focused: false,
      value: initialValue
    }
  }

  render() {
    return (
      <Grid
        item
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        spacing={2}
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
            {this.state.field}
          </Typography>
        </Grid>
        <Grid item>
          <Button
            style={{
              // TODO: Set background color as the current value
              backgroundColor: this.state.value
            }}
          />
        </Grid>
      </Grid>
    )
  }
}
