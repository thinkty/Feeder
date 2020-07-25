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
import FeedContainer from '../FeedContainer';
import SettingsDialog from '../SettingsDialog';

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
   * If connected to internet, read feeds from the specified feed list. If not 
   * connected to internet, load from local storage.
   */
  componentDidMount() {
    
    let feeds = this.state.feeds;

    // Load feeds from local storage if not connected to internet
    if (!navigator.onLine) {
      this.loadFromLocalStorage();
      return;
    }

    let parser = new Parser();
    let first = true;
    feedlist.feeds.forEach(feedInfo => {

      // Parse feed from given rss url
      parser.parseURL(CORS + feedInfo.rss)
      .then(res => {

        // Process each items from the feed
        const posts = res.items.map(item => {
          const temp = this.processItem(item);
          if (temp != null) {
            return temp;
          }
          return null;
        });

        // Save the processed feed
        feeds[feedInfo.name] = {
          feedInfo,
          posts
        }
        this.setState({ feeds });
        this.saveToLocalStorage(feeds);

        // Select the first parsed feed
        if (first) {
          first = false;
          this.setState({
            selected: feedInfo.name
          });
        }
      })
      .catch(err => {
        console.error(err);
      });
    });
  }

  /**
   * Save retrieved feeds to local storage to use when there is no internet
   * connection available.
   * 
   * @param {Object} feeds An object with the key of feedname and value of feed
   * items
   */
  saveToLocalStorage = (feeds) => {
    localStorage.setItem('feeds', JSON.stringify(feeds));
  }

  /**
   * Method to read the items from local storage. This function should be called
   * only when there are no internet connection.
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
    const { feeds, selected } = this.state;

    return (
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="center"
      >
        <SettingsDialog />
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
