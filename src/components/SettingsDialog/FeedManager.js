import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { getItem } from '../../utils/localstorageHandler';
import FeedPicker from './FeedPicker';

/**
 * Component to manage add/update/delete feeds
 */
export default function FeedManager() {
  // Logically, feedlists are set when the application starts, so unless the
  // list is removed by external forces, it should work
  const feeds = getItem('feedlist', true).feeds;

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      style={{ marginTop: '10px' }}
    >
      <Grid item>
        <Typography
          variant="h5"
          style={{
            color: '#fdfdfc',
            marginTop: '30px',
            marginBottom: '10px'
          }}
        >
          Feeds
        </Typography>
      </Grid>
      <Grid item>
        {
          feeds.map(feed => (
            <FeedPicker key={feed[Object.keys(feed)[0]]} feed={feed} />
          ))
        }
      </Grid>
      <Grid item>
        <Typography
          style={{
            color: '#8b96a4',
            marginTop: '30px',
            marginBottom: '10px'
          }}
        >
          Refresh the page for the changes to take effect
        </Typography>
      </Grid>
    </Grid>
  );
}
