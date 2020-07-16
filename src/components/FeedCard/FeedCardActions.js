
import React, { PureComponent } from 'react';
import { IconButton, Grid } from '@material-ui/core';
import SubjectIcon from '@material-ui/icons/Subject';
import CommentIcon from '@material-ui/icons/Comment';
import LinkIcon from '@material-ui/icons/Link';

const palette = require('../../configs/palette.json');

export default class FeedCardActions extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      comments: this.props.comments,
      link: this.props.link
    };
  }

  render() {

    const { comments, link } = this.state;
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
            href={link}
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
