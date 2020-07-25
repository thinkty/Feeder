import React, { Component } from 'react';
import { 
  Dialog,
} from '@material-ui/core';

export default class ContentDialog extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: this.props.open,
      onClose: this.props.onClose,
      content: this.props.content
    };
  }

  render() {

    if (this.state.open) {
      console.log('open');
    } else {
      console.log('close');
    }

    return (
      <Dialog
        fullScreen
        open={this.state.open}
        onClose={this.state.onClose}
      >
      </Dialog>
    )
  }
}
