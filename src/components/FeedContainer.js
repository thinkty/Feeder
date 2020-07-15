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
  CircularProgress
} from '@material-ui/core';
import { FixedSizeList as List } from 'react-window';
import FeedCard from './FeedCard';

const palette = require('../configs/palette.json');
const geometry = require('../configs/geometry.json');

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

  componentDidUpdate() {

    const propsFeed = this.props.feed;

    if (propsFeed !== undefined) {

      const feed = this.state.feed;

      // Update if feed is yet undefined
      if (feed === undefined) {
        this.setState({
          feed: propsFeed
        });
        return;
      }

      // If feed is not undefined, update only if contents change
      // which will probably not happen
      if (propsFeed.posts.length !== feed.posts.length) {
        this.setState({
          feed: propsFeed
        });
        return;
      }
    }
  }

  /**
   * Method to update window width on change
   */
  updateWindowWidth = () => {

    let width = window.innerWidth;

    if (width > geometry.feedcontainer.width.max) {
      width = geometry.feedcontainer.width.max;
    }

    this.setState({
      windowWidth: width
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

    // Initially, before fetching feed data, feed is undefined
    const feed = this.state.feed;
    if (!feed) {
      return (
        <div/>
      );
    }

    const feedInfo = feed.feedInfo;
    const posts = feed.posts;

    const Height = window.innerHeight - 320;
    const Width = this.state.windowWidth - 20;
    const ItemHeight = geometry.feedcard.height;
    const feedTheme = palette.text.feed;

    return (
      <div>
        <Typography
          variant="body2"
          style={{
            color: feedTheme.desc,
            margin: 20
          }}
          align="center"
        >
          { feedInfo.desc }
        </Typography>

        <List
          layout="vertical"
          height={Height}
          width={Width}
          itemCount={posts.length}
          itemSize={ItemHeight}
        >
          {({index, style}) => {
            const item = posts[index];
            return (
              <FeedCard 
                item={item}
                style={style}
              />
            );
          }}
        </List>
      </div>
    )
  }
}
