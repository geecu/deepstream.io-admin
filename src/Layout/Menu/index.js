import React, { Component, PropTypes } from 'react';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Divider from 'material-ui/Divider';
import inflection from 'inflection';

import Logout from './Logout';

export default class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
    }
  }

  componentWillMount() {
    const {
      ds,
      } = this.props;

    ds.on('connectionStateChanged', this.handleConnectionStateChange);
  }

  componentWillUnmount() {
    const {
      ds,
      } = this.props;

    ds.off('connectionStateChanged', this.handleConnectionStateChange);
  }

  handleConnectionStateChange = connectionState => {
    this.setState({
      loggedIn: connectionState === 'OPEN',
    })
  }

  render() {
    if (!this.state.loggedIn) {
      return null
    }

    const {
      router,
      resources,
      } = this.props;

    return (
      <IconMenu
        iconButtonElement={
          <IconButton><MoreVertIcon color="#fff" /></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        {
          resources.map(resource => {
            let {
              title,
              name,
              } = resource;
            title = title || inflection.humanize(inflection.pluralize(name));

            return (
              <MenuItem primaryText={ title }
                        leftIcon={ <resource.icon /> }
                        key={ name }
                        onTouchTap={ () => {
                          router.push(`/admin/${name}`);
                        }}
              />
            )
          })
        }
        <Divider />
        <Logout />
      </IconMenu>
    );
  }
}

Menu.propTypes = {}
