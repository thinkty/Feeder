import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import { checkItem, getItem } from '../../utils/localstorageHandler';

/**
 * Component to show Author and Date of the post
 */
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
    const palette = checkItem('colors') ? getItem('colors', true) : require('../../configs/palette.json');
    const { date, author } = this.state;

    return (
      <Typography
        variant="body2"
        noWrap
        style={{
          color: palette.textFeedcardAuthorAndDate,
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
