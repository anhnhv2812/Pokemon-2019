import React, { Component } from 'react';
import { IconButton, Snackbar, SnackbarContent, Slide } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Error, Info, Close, Warning, CheckCircle } from '@material-ui/icons';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import classNames from 'classnames';

const styles1 = theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

const styles2 = theme => ({
  margin: {
    margin: theme.spacing(1),
  },
});

let errorHandle, successHandle;
const autoHideDuration = 3000;
const variantIcon = {
  success: CheckCircle,
  warning: Warning,
  error: Error,
  info: Info,
};

const TransitionUp = (props) => {
  return <Slide {...props} direction="up" />;
}

const MySnackbarContent = (props) => {
  const { classes, className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={classNames(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          <Close className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

class Dialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      message: '',
      variant: 'error'
    };
  }

  componentDidMount() {
    errorHandle = (message) => {
      this.setState({ 
        open: true, 
        TransitionUp,
        message: message,
        variant: 'error'
      });
    }

    successHandle = (message) => {
      this.setState({ 
        open: true, 
        TransitionUp,
        message: message,
        variant: 'success'
      });
    }
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {

    return (
      <div>
        <Snackbar
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={this.state.Transition}
          autoHideDuration={autoHideDuration}
          // ContentProps={{
          //   'aria-describedby': 'message-id',
          // }}
          // message={<span id="message-id">{this.state.message}</span>}
        >
          <MySnackbarContentWrapper
            variant={this.state.variant}
            onClose={this.handleSnackbarClose}
            message={this.state.message}
          />
        </Snackbar>
      </div>
    );
  }
}

export default withStyles(styles2)(Dialog);

export const flashError = (message) => {
  errorHandle(message);
}

export const flashSuccess = (message) => {
  successHandle(message);
}