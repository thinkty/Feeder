import React, { Component } from 'react';
import {
  Grid,
  Typography,
  Box,
  FormControl,
  Select
} from '@material-ui/core';
import { 
  checkItem, 
  checkAuthor,
  parseDate
} from '../../utils/FeedParser';
import FeedContainer from '../FeedContainer/FeedContainer';

const feedlist = require('../../configs/feedlist.json');
const Parser = require('rss-parser');
const CORS = 'https://private-cors-anywhere.herokuapp.com/';
const palette = require('../../configs/palette.json');

export default class MainFeedPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      feeds: {},
      selected: null
    };

  }

  /**
   * If connected to internet, read feeds from the specified
   * feed list. If not connected to internet, read from
   * local storage.
   */
  componentDidMount() {
    
    let feeds = this.state.feeds;

    // Check if it is connected to internet
    if (!navigator.onLine) {
      // TODO: Read from localStorage
      return;
    }

    let parser = new Parser();
    let first = true;
    feedlist.feeds.forEach(feedInfo => {

      parser.parseURL(CORS + feedInfo.rss)
      .then(res => {
        let posts = [];
        res.items.forEach(item => {
          const temp = this.processItem(item);
          if (temp != null) {
            posts.push(temp);
          }
        });

        feeds[feedInfo.name] = {
          feedInfo,
          posts
        }
        this.setState({ feeds });

        if (first) {
          first = false;
          this.setState({
            selected: feedInfo.name
          });
        }
      })
      .catch(err => {
        console.error(err);
        // TODO: Error handling
      })
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
   * Method to validate the item and push it to the props. 
   * 
   * @param {Object} item Item read from the RSS feed
   * @returns {Object} Processed item on success, or null on error
   */
  processItem = (item) => {

    // Check the required fields
    if (!checkItem(item)) {
      return null;
    }

    // Some posts have `creator` instead of an author
    let authorizedItem = checkAuthor(item);
    if (authorizedItem == null) {
      return null;
    }

    authorizedItem.date = parseDate(authorizedItem.pubDate);
    return authorizedItem;
  }

  /**
   * Method to update the currently selected feed
   * 
   * @param {Object} event Event on selected changed
   */
  onSelectedChange = (event) => {
    this.setState({
      selected: event.target.value
    });
  }


  render() {
    const {
      feeds,
      selected
    } = this.state;

    return (
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="center"
      >
        <Grid item>
          <Typography
            variant="h3"
            style={{
              marginTop: '100px',
              marginBottom: '50px',
              fontWeight: 'bold',
              color: palette.text.header
            }}
          >
            <Box
              textAlign="center"
            >
              Feeder.
            </Box>
          </Typography>
        </Grid>
        {
          selected &&
          <Grid item>
            <FormControl>
              <Select
                native
                value={selected}
                onChange={this.onSelectedChange}
                style={{
                  width: '200px',
                  color: palette.text.main,
                  backgroundColor: '#344452'
                }}
              >
                {
                  Object.keys(feeds).map(name => {
                    return (
                      <option
                        key={name}
                        value={name}
                        style={{
                          color: '#8b96a4'
                        }}
                      >
                        {name}
                      </option>
                    );
                  })
                }
              </Select>
            </FormControl>
          </Grid>
        }
        <Grid item>
          <FeedContainer 
            feed={feeds[selected]}
          />
        </Grid>
      </Grid>
    )
  }
}
