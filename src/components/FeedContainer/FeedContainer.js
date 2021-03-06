/**
 * This component contains the feed items and displays a 
 * general information about the feed such as the name
 * of a feed, description of the feed, and the group.
 */

import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import { FixedSizeList as List } from 'react-window';
import FeedCard from '../FeedCard/FeedCard';
import { checkItem, getItem } from '../../utils/localstorageHandler';

const geometry = require('../../configs/geometry.json');

// For scrolling back to top on switching between feeds
const listRef = React.createRef();

export default class FeedContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      feed: this.props.feed,
      windowWidth: window.innerWidth
    };
  }

  /**
   * Update the size of the feed container
   */
  componentDidMount() {
    this.updateWindowWidth();
    window.addEventListener('resize', this.updateWindowWidth);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowWidth);
  }

  /**
   * Update if feed is yet undefined OR contents of the feed has changed
   */
  componentDidUpdate() {
    const { feed } = this.props;
    if (!feed) {
      return;
    }

    if (this.state.feed === undefined ||
      feed.posts.length !== this.state.feed.posts.length
    ) {
      this.setState({ feed });

      // Scroll back to top when possible on feed change
      if (!!listRef.current) {
        listRef.current.scrollToItem(0);
      }
      return;
    }
  }

  /**
   * Method to update window width on change
   */
  updateWindowWidth = () => {
    const { max } = geometry.feedcontainer.width;
    const windowWidth = Math.min(window.innerWidth, max);
    this.setState({ windowWidth });
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
    if (!this.state.feed) {
      return (<div/>);
    }

    // 320 has been calculated regarding the height of the previous elements
    const Height = window.innerHeight - 320;
    const Width = this.state.windowWidth - geometry.feedcontainer.margin;
    const { feedInfo, posts } = this.state.feed;
    const palette = checkItem('colors') ? getItem('colors', true) : require('../../configs/palette.json');

    return (
      <div>
        <Typography
          variant="body2"
          style={{
            color: palette.textFeedDesc,
            margin: geometry.feedcontainer.margin
          }}
          align="center"
        >
          { feedInfo.desc }
        </Typography>
        <List
          ref={listRef}
          layout="vertical"
          height={Height}
          width={Width}
          itemCount={posts.length}
          itemSize={geometry.feedcard.height}
        >
          {({index, style}) => {
            const item = posts[index];
            return (
              <FeedCard 
                item={item}
                style={style}
                width={Width}
              />
            );
          }}
        </List>
      </div>
    )
  }
}
