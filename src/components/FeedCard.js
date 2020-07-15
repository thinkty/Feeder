import React, { Component } from 'react';
/**
 * This is a feed card component to display a previw of the
 * feed post. It includes the following fields from the feed
 * if available.
 * 
 * - title {String}
 * - date , author (creator) {String}
 * - link to that page {String}
 * - comments url {String} : unique to some feeds
 * - categories {Array} : unique to some feeds
 * - contents {html}
 */

import { 
  Paper, 
  Typography, 
  Divider, 
  Grid, 
  Chip, 
  IconButton, 
  Tooltip
} from '@material-ui/core';
import SubjectIcon from '@material-ui/icons/Subject';
import CommentIcon from '@material-ui/icons/Comment';
import LinkIcon from '@material-ui/icons/Link';

const palette = require('../configs/palette.json');
const geometry = require('../configs/geometry.json');

export default class FeedCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      style: props.style,
      title: props.item.title,
      date: props.item.date,
      author: props.item.author,
      link: props.item.link,
      comments: props.item.comments,
      categories: props.item.categories,
      content: props.item.content,
      openContent: false,
    };
  }

  // Performance optimization
  shouldComponentUpdate(nextProps, nextState) {
    // This component will never need to be re-rendered
    return false;
  }

  /**
   * Handler to show/hide contents of the feed
   */
  handleToggleContent = () => {
    let currentState = this.state.openContent;
    this.setState({
      openContent: !currentState
    });
  }

  openContentDialog = () => {
    this.setState({
      openContent: true
    });
  }
  closeContentDialog = () => {
    this.setState({
      openContent: false
    });
  }

  render() {

    const {style, comments, content, link} = this.state;
    const marginLeft = geometry.feedcard.margin.left;
    const marginTop = geometry.feedcard.margin.top;
    const height = geometry.feedcard.height;
    const padding = geometry.feedcard.padding;
    const feedCardTextTheme = palette.text.feedcard;
    const feedCardIconTheme = palette.icons.feedcard;

    return (
      <div>
        <Paper
          elevation={20}
          variant="elevation"
          style={{
            ...style,
            left: style.left + marginLeft,
            top: style.top + marginTop,
            width: '98%',
            height: height - marginTop,
            backgroundColor: palette.mui.background.post,
            paddingTop: padding,
            paddingLeft: padding
          }}
        >
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="flex-start"
          >
            <Grid 
              item
              xs={12}  
            >
              {/* Title */}
              <Typography
                variant="body1"
                noWrap
                gutterBottom
                style={{
                  color: feedCardTextTheme.title,
                  fontWeight: "normal",
                }}
              >
                { this.state.title }
              </Typography>
            </Grid>

            <Grid
              item
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              {/* Author, Date */}
              <Grid
                item
                xs={9}
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
                spacing={1}
              >
                <Grid item>
                  <Typography
                    variant="body2"
                    style={{
                      color: feedCardTextTheme.author
                    }}
                  >
                    { 'By ' + this.state.author }
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    variant="body2"
                    noWrap
                    style={{
                      color: feedCardTextTheme.date
                    }}
                  >
                    { '@ ' + this.state.date }
                  </Typography>
                </Grid>
              </Grid>
                          
              {/* Content, Link, Comments */}
              <Grid
                item
                xs={3}
                container
                direction="row"
                justify="flex-end"
                alignItems="center"
              >
                <Grid item>
                  <IconButton
                    size="small"
                  >
                    <SubjectIcon 
                      style={{
                        color: feedCardIconTheme.content
                      }}
                    />
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton
                    href={link}
                    size="small"
                  >
                    <LinkIcon 
                      style={{
                        color: feedCardIconTheme.link
                      }}
                    />
                  </IconButton>
                </Grid>
                {
                  comments &&
                  <Grid item>
                    <IconButton
                      href={comments}
                      size="small"
                    >
                      <CommentIcon
                        style={{
                          color: feedCardIconTheme.comments
                        }}
                      />
                    </IconButton>
                  </Grid>
                }
              </Grid>
            </Grid>
          </Grid>
        </Paper>

        {/* Content Dialog */}

      </div>
    );
  }
}
