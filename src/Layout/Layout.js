import React, { PropTypes } from 'react';

import Header from './Header';

import styles from '../styles';

const Layout = ({
  ds,
  resources,
  children,
  title,
  router,
  menu,
  }) => {
  return (
    <div>
      <Header ds={ ds }
              title={ title }
              resources={ resources }
              router={ router }
              menu={ menu }
      />
      <div style={ styles.page }>
        { children }
      </div>
    </div>
  )
}

Layout.propTypes = {
  ds: PropTypes.object.isRequired,
}

export default Layout
