import React, { Component } from 'react';
import { 
  IconButton,
  Grid
} from '@material-ui/core';
import SubjectIcon from '@material-ui/icons/Subject';
import CommentIcon from '@material-ui/icons/Comment';
import LinkIcon from '@material-ui/icons/Link';

const palette = require('../configs/palette.json');

export default class FeedCardActions extends Component {

  constructor(props) {
    super(props);
    this.state = {
      comments: this.props.comments,
      content: this.props.content, 
      link: this.props.link
    };
  }

  render() {

    const { comments, content, link } = this.state;
    const feedCardIconTheme = palette.icons.feedcard;

    return (
      <Grid
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
    )
  }
}
