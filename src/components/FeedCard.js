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
  Typography,
  Grid,
  IconButton,
} from '@material-ui/core';
import FeedCardTitle from './FeedCardTitle';
import FeedCardAuthorAndDate from './FeedCardAuthorAndDate';
import FeedCardActions from './FeedCardActions';

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

  openContentDialog = () => {
    this.setState({
      openContent: true
    });
  }
  
  closeContentDialog = () => {
    this.setState({
      openContent: false
    });
  }

  render() {

    const { style } = this.state;
    const { margin, height, padding } = geometry.feedcard;

    return (
      <div>
        <Paper
          elevation={20}
          variant="elevation"
          style={{
            ...style,
            left: style.left + margin.left,
            top: style.top + margin.top,
            width: '98%',
            height: height - margin.top,
            backgroundColor: palette.mui.background.post,
            padding: `${padding}px ${padding}px 0px ${padding}px`
          }}
        >
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="flex-start"
          >
            <Grid item xs={12}>
              <FeedCardTitle title={this.state.title}/>
            </Grid>
            <Grid
              item
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Grid item xs={8}>
                <FeedCardAuthorAndDate 
                  date={this.state.date} 
                  author={this.state.author}
                />
              </Grid>
                          
              {/* Content, Link, Comments */}
              <Grid item xs={4}>
                <FeedCardActions 
                  comments={this.state.comments}
                  content={this.state.content}
                  link={this.state.link}
                />
              </Grid>
            </Grid>
          </Grid>
        </Paper>

        {/* Content Dialog */}

      </div>
    );
  }
}
