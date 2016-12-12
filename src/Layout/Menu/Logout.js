import React, { Component, PropTypes } from 'react';
import MenuItem from 'material-ui/MenuItem';
import ExitToApp from 'material-ui/svg-icons/action/exit-to-app';

class Logout extends Component {
  render() {
    const {
      ds,
      router,
      } = this.context;

    return (
      <MenuItem primaryText="Sign out"
                leftIcon={ <ExitToApp /> }
                { ...this.props }
                onTouchTap={() => {
                    ds.close();
                    window.localStorage.removeItem('login');
                    router.go('/login');
                  }}
      />
    )
  }
}

Logout.propTypes = {
}

Logout.contextTypes = {
  ds: PropTypes.object,
  router: PropTypes.object,
}

export default Logout