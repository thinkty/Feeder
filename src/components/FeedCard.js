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
  Paper, Typography, Divider, Grid,

} from '@material-ui/core';
import LinkIcon from '@material-ui/icons/Link';
import ChatIcon from '@material-ui/icons/Chat';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

const palette = require('../configs/palette.json');
const geometry = require('../configs/geometry.json');

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
    const marginLeft = geometry.feedcard.margin.left;
    const marginTop = geometry.feedcard.margin.top;
    const height = geometry.feedcard.height;
    const padding = geometry.feedcard.padding;
    const style = this.state.style;
    const feedCardTextTheme = palette.text.feedcard;
    const feedCardIconTheme = palette.icons.feedcard;

    const categories = this.state.categories;
    

    return (
      <Paper
        elevation={20}
        variant="elevation"
        style={{
          ...style,
          left: style.left + marginLeft,
          top: style.top + marginTop,
          width: style.width - marginLeft,
          height: height - marginTop,
          backgroundColor: palette.mui.background.post,
          padding: padding
        }}
      >
        {/* Title */}
        <Typography
          variant="h6"
          align="center"
          style={{
            color: feedCardTextTheme.title,
            fontWeight: "normal",
            paddingBottom: padding
          }}
        >
          { this.state.title }
        </Typography>
        <Divider />

        {/* Author, Date, Link */}
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
        >
          <Grid item>
            <Typography>
              { 'By ' + this.state.author }
            </Typography>
          </Grid>
          <Grid item>
            <Typography>
              { '@' + this.state.date }
            </Typography>
          </Grid>
        </Grid>


        {/* Categories, Comments, Content */}

        {/* Content */}
      </Paper>
    );
  }
}
