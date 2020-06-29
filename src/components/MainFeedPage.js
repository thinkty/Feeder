import React, { Component } from 'react';
import { 
  Grid, Typography, Box 
} from '@material-ui/core';
import { 
  checkItem, 
  checkAuthor,
  parseDate
} from '../utils/FeedParser';
import FeedContainer from './FeedContainer';

const feedlist = require('../configs/feedlist.json');
const Parser = require('rss-parser');
const CORS = 'https://private-cors-anywhere.herokuapp.com/';

export default class MainFeedPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      feeds: {}
    };

  }

  /**
   * If connected to internet, read feeds from the specified
   * feed list. If not connected to internet, read from
   * local storage.
   */
  componentDidMount() {
    let parser = new Parser();
    let feeds = this.state.feeds;

    // Check if it is connected to internet
    if (!navigator.onLine) {
      return;
    }

    feedlist.feeds.map(async feedInfo => {

      // Add the feed information to state
      feeds[feedInfo.name] = {
        feedInfo,
        items: []
      };
      this.setState({ feeds });

      parser.parseURL(CORS + feedInfo.rss)
      .catch(err => {
        console.error(err);
      })
      .then(feed => {
        // Process each item before rendering
        feed.items.forEach(item => {
          this.processItem(feedInfo, item);
        });
      });
      return null;
    });
  }

  /**
   * Method to read the items from local storage
   */
  loadFromLocalStorage = () => {
    const rawFeeds = localStorage.getItem('feeds');
    if (rawFeeds == null) {
      console.log('No recent feeds found');
      return;
    }

    const feeds = JSON.parse(rawFeeds);
    this.setState({ feeds });
  }

  /**
   * Method to validate the item and push it to
   * the props. 
   * 
   * @param {*} feedInfo Information about the feed
   * @param {*} item Item read from the RSS feed
   */
  processItem = (feedInfo, item) => {

    if (!checkItem(item)) {
      return;
    }

    let authorizedItem = checkAuthor(item);
    if (authorizedItem == null) {
      return;
    }

    authorizedItem.date = parseDate(authorizedItem.pubDate);

    // Push the item to correct feeds
    let feeds = this.state.feeds;
    feeds[feedInfo.name].items.push(authorizedItem);
    this.setState({ feeds });

    // Save to local storage
    localStorage.setItem('feeds', JSON.stringify(feeds));
  }


  render() {
    const feeds = this.state.feeds;

    return (
      <div>
        <Typography
          variant="h3"
          style={{
            marginTop: '100px',
            marginBottom: '50px',
            fontWeight: 'bold',
          }}
        >
          <Box
            textAlign="center"
          >
            Feeder.
          </Box>
        </Typography>
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="center"
          spacing={3}
        >
          {
            Object.keys(feeds).map(feed => {
              return (
                <FeedContainer 
                  key={feed}
                  feed={feeds[feed]}
                />
              );
            })
          }
        </Grid>
      </div>
    )
  }
}