import React, { Component } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { IconButton, Grid, Typography } from '@material-ui/core';


/**
 * Component to edit feed url
 */ 
export default class FeedPicker extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: this.props.feed.name,
      desc: this.props.feed.desc,
      rss: this.props.feed.rss,
      modified: false
    };
  }

  onChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  render() {
    return (
      <div>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          spacing={2}
        >
          <Grid item>
            <Typography
              variant="body1"
              style={{
                color: '#8b96a4'
              }}
            >
              { this.state.name }
            </Typography>
          </Grid>
          <Grid item>
            <IconButton
              size="small"
            >
              <EditIcon 
                style={{
                  color: '#8b96a4'
                }}
              />
            </IconButton>
            <IconButton
              size="small"

            >
              <HighlightOffIcon 
                style={{
                  color: '#8b96a4'
                }}
              />
            </IconButton>
          </Grid>
        </Grid>
      </div>
    );
  }
}
