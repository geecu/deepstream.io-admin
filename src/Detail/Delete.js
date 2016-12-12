import React, { Component, PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';

import styles from '../styles';

export default class Delete extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alertOpen: false,
    }
  }

  handleClick = () => {
    //return this.handleDelete(); //for dbg purposes, delete without confirmation

    this.setState({
      alertOpen: true,
    })
  }

  handleClose = () => {
    this.setState({
      alertOpen: false,
    })
  }

  handleDelete = () => {
    this.handleClose();

    this.props.onDelete();
  }

  render() {
    const actions = [
      <FlatButton label="Cancel"
                    style={ styles.cancelDeleteBtn }
                    icon={ <NavigationArrowBack /> }
                    onTouchTap={ this.handleClose }
      />,
      <FlatButton label="Delete"
                    secondary={ true }
                    style={ styles.confirmDeleteBtn }
                    icon={ <ActionDelete /> }
                    onTouchTap={ this.handleDelete }
      />,
    ]

    return (
      <div>
        <RaisedButton label="Delete"
                      secondary={ true }
                      style={ styles.deleteBtn }
                      icon={ <ActionDelete /> }
                      onTouchTap={ this.handleClick }
        />
        <Dialog
          actions={ actions }
          modal={ false }
          open={ this.state.alertOpen }
          onRequestClose={ this.handleClose }
        >
          Are you sure you want to delete this record?
        </Dialog>
      </div>
    )
  }
}

Delete.propTypes = {}
