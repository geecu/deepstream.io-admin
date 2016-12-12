import React, { PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';

import Menu from './Menu';

import styles from '../styles';

const Header = ({
  title,
  menu,
  ...otherProps
  }) => {

  return (
    <AppBar
      title={ title }
      style={ styles.appBar }
      showMenuIconButton={ false }
      iconElementRight={ menu ? React.cloneElement(menu, {
      ...menu.props,
      ...otherProps
      }) : <Menu { ...otherProps} /> }
    />
  )
}

Header.propTypes = {
  ds: PropTypes.object.isRequired,
}

export default Header
