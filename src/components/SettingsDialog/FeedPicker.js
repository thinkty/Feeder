import React, { Component } from 'react';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { IconButton, Grid, Typography } from '@material-ui/core';
import { getItem, setItem } from '../../utils/localstorageHandler';

/**
 * Component to edit feed url
 */ 
export default class FeedPicker extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: this.props.feed.name,
      desc: this.props.feed.desc,
      rss: this.props.feed.rss,
    };
  }

  removeFeed = () => {
    const feedlist = getItem('feedlist', true);
    const { feeds } = feedlist;
    for (let i = 0; i < feeds.length; i++) {
      const feed = feeds[i];
      if (feed.name === this.state.name) {
        feeds.splice(i, 1);
        feedlist.feeds = feeds;
        setItem('feedlist', feedlist, true);
        return;
      }
    }
  }

  render() {
    return (
      <div>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          spacing={2}
        >
          <Grid item>
            <Typography variant="body1" style={{ color: '#8b96a4' }}>
              { this.state.name }
            </Typography>
          </Grid>
          <Grid item>
            <IconButton size="small" onClick={this.removeFeed}>
              <HighlightOffIcon style={{ color: '#8b96a4' }} />
            </IconButton>
          </Grid>
        </Grid>
      </div>
    );
  }
}
