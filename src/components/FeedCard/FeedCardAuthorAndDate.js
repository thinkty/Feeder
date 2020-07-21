
import React, { Component } from 'react';
import { Typography } from '@material-ui/core';

const palette = require('../../configs/palette.json');

export default class FeedCardAuthorAndDate extends Component {

  constructor(props) {
    super(props);
    this.state = {
      width: this.props.width,
      date: this.props.date,
      author: this.props.author
    };
  }

  render() {
    const { date, author } = this.state;

    return (
      <Typography
        variant="body2"
        noWrap
        style={{
          color: palette.text.feedcard.authorAndDate,
          width: this.state.width * 0.8
        }}
      >
        {
          `@ ${date} By ${author}`
        }
      </Typography>
    );
  }
}
