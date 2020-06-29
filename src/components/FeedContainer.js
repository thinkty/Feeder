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
  ExpansionPanel,
} from '@material-ui/core';
import FeedCard from './FeedCard';

// 5 posts per page
const postsPerPage = 5;

export default class FeedContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      feed: this.props.feed,
      page: [],
      pageNum: 0
    };
  }

  /**
   * Load the first page of items on props update
   * from parent component
   */
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.feed.items.length !== 
        this.props.feed.items.length) {
          
      const feed = this.props.feed;
      const items = feed.items;
      let page = [];
      console.log(items);
      console.log(items.length);
      for (let i = 0; i < postsPerPage; i++) {
        if (i === items.length) {
          break;
        }
        page.push(items[i]);
      }
  
      this.setState({ feed, page });
    }
  }


  /**
   * Method to load next page
   */
  loadNextPage = () => {
    const items = this.state.feed.items;
    let pageNum = this.state.pageNum;
    pageNum++;

    // Check if page number has exceeded
    if (pageNum * postsPerPage >= items.length) {
      pageNum = 0;
    }

    // Get items of next page
    const index = postsPerPage * pageNum;
    let page = [];
    for (let i = index; i < index + postsPerPage; i++) {
      if (i === items.length) {
        break;
      }
      page.push(items[i]);
    }

    this.setState({ items, pageNum });
  }

  render() {
    const feed = this.state.feed;
    const feedInfo = feed.feedInfo;
    const items = this.state.page;

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

        <Paper elevation={3}>
          {
            items.map(item => {
              // return (
              //   <ExpansionPanel
              //     key={item.title}

              //   >

              //   </ExpansionPanel>
              // );
              console.log(item)
              return (
                <FeedCard 
                  title={item.title}
                  date={item.date}
                  author={item.author}
                  link={item.link}
                  comments={item.comments}
                  categories={item.categories}
                  content={item.content}
                />
              );
            })
          }
        </Paper>
      </Grid>
    )
  }
}
