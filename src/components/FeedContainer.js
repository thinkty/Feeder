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
import { FixedSizeList as List } from 'react-window';
import FeedCard from './FeedCard';

const palette = require('../configs/palette.json');

export default class FeedContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      feed: this.props.feed,
      windowWidth: window.innerWidth
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
      windowWidth: window.innerWidth
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
    const Height = 300;
    const Width = this.state.windowWidth - 60;
    const ItemWidth = 300;
    const feedTheme = palette.text.feed;

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
              style={{
                color: feedTheme.title
              }}
            >
              { feedInfo.name }
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              variant="body2"
              style={{
                color: feedTheme.group
              }}
            >
              { feedInfo.group }
            </Typography>
          </Grid>
        </Grid>
        <Typography
          variant="body2"
          style={{
            color: feedTheme.desc,
            marginBottom: "10px"
          }}
        >
          { '- ' + feedInfo.desc }
        </Typography>

        <Paper 
          elevation={0}
          variant="outlined"
          style={{
            height: Height,
            width: Width
          }}
        >
          <List
            height={Height}
            width={Width}
            itemCount={items.length}
            itemSize={ItemWidth}
            layout="horizontal"
          >
            {({index, style}) => {
              const item = items[index];
              return (
                <FeedCard 
                  item={item}
                  style={style}
                />
              );
            }}
          </List>
        </Paper>
      </Grid>
    )
  }
}
