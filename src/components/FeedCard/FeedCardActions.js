import React, { PureComponent } from 'react';
import {
  IconButton,
  Grid,
  Dialog,
  List,
  ListItem,
  Avatar,
  ListItemAvatar,
  ListItemText
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CommentIcon from '@material-ui/icons/Comment';
import LinkIcon from '@material-ui/icons/Link';
import { checkItem, getItem } from '../../utils/localstorageHandler';

/**
 * Component to list original source url, or comments (unique to Hackernews)
 */
export default class FeedCardActions extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      height: this.props.height,
      comments: this.props.comments,
      link: this.props.link,
      open: false
    };
  }

  openMenu = () => {
    this.setState({
      open: true
    });
  }

  handleClose = () => {
    this.setState({
      open: false
    });
  }

  // Open new tab with given url
  handleUrl = (url) => {
    window.open(url);
    this.handleClose();
  }

  render() {

    const palette = checkItem('colors') ? getItem('colors', true) : require('../../configs/palette.json');
    const { height, comments, link, open } = this.state;
    const feedCardIconTheme = palette.icons;

    return (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        style={{ height }}
      >
        <Grid item>
          <IconButton
            onClick={this.openMenu}
          >
            <MoreVertIcon 
              style={{
                color: feedCardIconTheme
              }}
            />
          </IconButton>
        </Grid>

        <Dialog
          open={open}
          onClose={this.handleClose}
          PaperProps={{
            style: {backgroundColor: palette.primaryMain}
          }}
        >
          <List>
            <ListItem
              button
              onClick={() => {
                this.handleUrl(link)
              }}
            >
              <ListItemAvatar>
                <Avatar>
                  <LinkIcon 
                    style={{ color: feedCardIconTheme }}
                  />
                </Avatar>
              </ListItemAvatar>
              <ListItemText 
                primary="Link" 
                style={{
                  color: palette.textFeedcardTitle
                }}
              />
            </ListItem>
            {
              comments &&
              <ListItem
                button
                onClick={() => {
                  this.handleUrl(comments)
                }}
              >
                <ListItemAvatar>
                  <Avatar>
                    <CommentIcon 
                      style={{ color: feedCardIconTheme }}
                    />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary="Comments"
                  style={{
                    color: palette.textFeedcardTitle
                  }}
                />
              </ListItem>
            }
          </List>
        </Dialog>
      </Grid>
    );
  }
}
