import React, { Component } from 'react';
import {
  Typography,
  Dialog,
  IconButton,
  Grid
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const palette = require('../../configs/palette.json');

/**
 * Component to show Title of the post
 */
export default class FeedCardTitle extends Component {

  constructor(props) {
    super(props);
    this.state = {
      width: this.props.width,
      title: this.props.title,
      open: false
    };
  }

  openDialog = () => {
    this.setState({
      open: true
    });
  }

  closeDialog = () => {
    this.setState({
      open: false
    });
  }

  render() {
    return (
      <div>
        <div 
          onClick={this.openDialog}
        >
          <Typography
            variant="body1"
            noWrap
            gutterBottom
            style={{
              color: palette.textFeedcardTitle,
              fontWeight: "normal",
              width: this.state.width * 0.8
            }}
          >
            { this.state.title }
          </Typography>
        </div>
        <Dialog
          open={this.state.open}
          onClose={this.closeDialog}
        >
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid item>
              <Typography
                variant="body1"
                style={{
                  color: palette.textFeedcardTitle,
                  margin: '10px'
                }}
              >
                { this.state.title }
              </Typography>
            </Grid>
            <Grid item>
              <IconButton
                onClick={this.closeDialog}
                style={{
                  color: '#8b96a4',
                  margin: '10px'
                }}
              >
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Dialog>
      </div>
    );
  }
}
