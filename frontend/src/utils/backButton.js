import React, { Component } from 'react';
import { ArrowBackIos } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';

const style = theme => ({
  backButtonComponent: {
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 10,
    '&> span': {
      fontSize: 24,
      position: 'relative',
      bottom: 1,
      left: -4
    }
  }
});

class BackButton extends Component {
  handleClick = () => {
    if (typeof this.props.onClick === 'function') {
      this.props.onClick();
    }
  };

  render() {
    return (
      <div className={this.props.classes.backButtonComponent} onClick={this.handleClick}>
        <ArrowBackIos/> 
        <span>Back</span>
      </div>
    );
  }
}

export default withStyles(style)(BackButton);