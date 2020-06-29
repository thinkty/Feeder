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
  Card, 
  CardHeader, 
  IconButton, 
  CardContent, 
  Typography,
  CardActions,
  Chip,
  Collapse,
} from '@material-ui/core';
import LinkIcon from '@material-ui/icons/Link';
import ChatIcon from '@material-ui/icons/Chat';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

export default class FeedCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      date: props.title,
      author: props.author,
      link: props.link,
      comments: props.comments,
      categories: props.categories,
      content: props.content,
      openContent: false,
    };
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

  render() {
    const categories = this.state.categories;

    return (
      <Card>
        {/* Author, Date, Link */}
        <CardHeader 
          action={
            <IconButton href={this.state.link}>
              <LinkIcon />
            </IconButton>
          }
          title={this.state.author}
          subheader={this.state.date}
        />

        {/* Title */}
        <CardContent>
          <Typography>
            {this.state.title}
          </Typography>
        </CardContent>

        {/* Categories, Comments, Content */}
        <CardActions>
          {
            categories &&
            categories.forEach(category => {
              return (<Chip label={category} />);
            })
          }
          {
            this.state.comments &&
            <IconButton href={this.state.comments}>
              <ChatIcon />
            </IconButton>
          }
          {
            <IconButton onClick={this.handleToggleContent}>
              {
                this.state.openContent
                ? <ExpandLessIcon />
                : <ExpandMoreIcon />
              }
            </IconButton>
          }
        </CardActions>

        {/* Content */}
        <Collapse
          in={this.state.openContent}
          timeout='auto'
          unmountOnExit
        >
          <CardContent>
            {
              this.state.content
            }
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}
