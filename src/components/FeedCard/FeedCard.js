import React, { PureComponent } from 'react';
import { Paper, Grid } from '@material-ui/core';
import FeedCardTitle from './FeedCardTitle';
import FeedCardAuthorAndDate from './FeedCardAuthorAndDate';
import FeedCardActions from './FeedCardActions';

const palette = require('../../configs/palette.json');
const geometry = require('../../configs/geometry.json');

/**
 * This is a feed card component to display a previw of the
 * feed post. It includes the following fields from the feed
 * if available.
 * 
 * - title (String)
 * - date , author/creator (String)
 * - link to that page (String)
 * - comments url (String) : unique to some feeds
 * - contents (html)
 */
export default class FeedCard extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      width: props.width,
      style: props.style,
      title: props.item.title,
      date: props.item.date,
      author: props.item.author,
      link: props.item.link,
      comments: props.item.comments
    };
  }

  render() {

    const { style, width } = this.state;
    const { margin, height, padding } = geometry.feedcard;

    return (
      <Paper
        variant="elevation"
        elevation={0}
        style={{
          ...style,
          height: height - margin.top,
          padding: `${padding}px ${padding}px 0px ${padding}px`
        }}
      >
        <Grid
          container
          spacing={1}
        >
          <Grid item xs={11}>
            <Paper
              variant="elevation"
              elevation={0}
              style={{
                height: height - margin.top,
                backgroundColor: palette.mui.primary.main,
                padding: `${padding}px ${padding}px 0px ${padding}px`
              }}
            >
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="flex-start"
              >
                <Grid item>
                  <FeedCardTitle 
                    title={this.state.title} 
                    width={width} 
                  />
                </Grid>
                <Grid item>
                  <FeedCardAuthorAndDate 
                    date={this.state.date} 
                    author={this.state.author}
                    width={width}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={1}>
            <Paper
              variant="elevation"
              elevation={0}
              style={{
                height: height - margin.top,
                backgroundColor: palette.mui.background.post,
              }}
            >
              <FeedCardActions 
                height={height - margin.top}
                comments={this.state.comments}
                link={this.state.link}
              />
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}
