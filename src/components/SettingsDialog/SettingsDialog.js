import React, { Component } from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import CloseIcon from '@material-ui/icons/Close';
import {
  AppBar,
  Toolbar,
  IconButton,
  Dialog,
  DialogContent,
} from '@material-ui/core';
import ColorManager from './ColorManager';
import FeedManager from './FeedManager';

/**
 * Component to configure colors and manage feedlists
 */
export default class SettingsDialog extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      modified: false
    };
  }

  openConfig = () => {
    this.setState({
      open: true
    });
  }

  closeConfig = () => {
    this.setState({
      open: false
    });
  }

  render() {
    return (
      <div>
        <AppBar 
          position="fixed"
          variant="elevation"
          elevation={0}
          style={{
            backgroundColor: 'transparent'
          }}
        >
          <Toolbar variant="dense">
            <IconButton
              edge="end"
              onClick={this.openConfig}
              style={{
                color: '#8b96a4',
                marginLeft: 'auto'
              }}
            >
              <SettingsIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        
        <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.closeConfig}
        >
          <AppBar
            position="fixed"
            variant="elevation"
            elevation={0}
            style={{
              backgroundColor: 'transparent',
            }}
          >
            <Toolbar>
              <IconButton
                onClick={this.closeConfig}
                style={{
                  color: '#8b96a4',
                  marginLeft: 'auto'
                }}
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>

          <DialogContent>
            <ColorManager />
            <FeedManager />
          </DialogContent>
        </Dialog>
      </div>
    )
  }
}
