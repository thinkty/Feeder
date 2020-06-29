/**
 * This component contains the feed items and displays a 
 * general information about the feed such as the name
 * of a feed, description of the feed, and the group.
 */

import React, { Component } from 'react';
import { 
  Paper,
  Grid,
  Typography,
  ListItem,
} from '@material-ui/core';
import FeedCard from './FeedCard';

const Height = 500;

export default class FeedContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      feed: this.props.feed,
      windowWidth: window.innerHeight
    };
  }

  /**
   * Update window size
   */
  componentDidMount() {
    this.updateWindowWidth();
    window.addEventListener('resize', this.updateWindowWidth);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowWidth);
  }

  /**
   * Method to update window width on change
   */
  updateWindowWidth = () => {
    this.setState({
      windowWidth: window.innerHeight
    });
  }

  /**
   * Get the contents of the item based on the
   * given index.
   * 
   * @param {Number} index Index of the item in the array
   * @returns An object with item info or null on error
   */
  getItemContents = (index) => {
    const feed = this.state.feed;
    const items = feed.items;
    
    if (items === undefined ||
        items[index] === undefined) {
      return null;
    }
    return items[index];
  }

  render() {
    const feed = this.state.feed;
    const feedInfo = feed.feedInfo;
    const items = feed.items;

    return (
      <Grid item>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-end"
          spacing={1}
        >
          <Grid item>
            <Typography
              color="textPrimary"
            >
              { feedInfo.name }
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              variant="body2"
              color="textSecondary"
            >
              { feedInfo.group }
            </Typography>
          </Grid>
        </Grid>
        <Typography
          variant="body2"
          color="textSecondary"
        >
          { '- ' + feedInfo.desc }
        </Typography>

        <Paper 
          elevation={3}
          style={{
            height: Height,
            width: window.innerWidth-60
          }}
        >
        </Paper>
      </Grid>
    )
  }
}
