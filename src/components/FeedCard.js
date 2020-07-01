import React, { Component } from 'react';
/**
 * This is a feed card component to display a previw of the
 * feed post. It includes the following fields from the feed
 * if available.
 * 
 * - title {String}
 * - date , author (creator) {String}
 * - link to that page {String}
 * - comments url {String} : unique to some feeds
 * - categories {Array} : unique to some feeds
 * - contents {html}
 */

import { 
  Paper,

} from '@material-ui/core';
import LinkIcon from '@material-ui/icons/Link';
import ChatIcon from '@material-ui/icons/Chat';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

const palette = require('../configs/palette.json');

export default class FeedCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      style: props.style,
      title: props.item.title,
      date: props.item.date,
      author: props.item.author,
      link: props.item.link,
      comments: props.item.comments,
      categories: props.item.categories,
      content: props.item.content,
      openContent: false,
    };
  }

  /**
   * Handler to show/hide contents of the feed
   */
  handleToggleContent = () => {
    let currentState = this.state.openContent;
    this.setState({
      openContent: !currentState
    });
  }

  render() {
    const Margin = 5;
    const ItemHeight = 280;

    const categories = this.state.categories;
    let style = this.state.style;

    return (
      <Paper
        elevation={20}
        variant="elevation"
        style={{
          ...style,
          left: style.left + Margin,
          top: style.top + Margin,
          width: style.width - Margin,
          height: ItemHeight - Margin,
          backgroundColor: palette.mui.background.post
        }}
      >
        {/* Author, Date, Link */}

        {/* Title */}

        {/* Categories, Comments, Content */}

        {/* Content */}
      </Paper>
    );
  }
}
