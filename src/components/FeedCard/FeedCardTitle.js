
import React, { Component } from 'react';
import { Typography } from '@material-ui/core';

const palette = require('../../configs/palette.json');

export default class FeedCardTitle extends Component {

  constructor(props) {
    super(props);
    this.state = {
      width: this.props.width,
      title: this.props.title
    };
  }

  render() {
    return (
      <Typography
        variant="body1"
        noWrap
        gutterBottom
        style={{
          color: palette.text.feedcard.title,
          fontWeight: "normal",
          width: this.state.width * 0.8
        }}
      >
        { this.state.title }
      </Typography>
    );
  }
}
