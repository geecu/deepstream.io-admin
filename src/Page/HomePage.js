import React, { PropTypes } from 'react';

const HomePage = ({
  ds,
  }, {
  router,
  }) => {
  const isConnected = ds.getConnectionState() === 'OPEN';

  setTimeout(() => {
    if (!isConnected) {
      router.push('/login');
    } else {
      router.push('/admin');
    }
  })

  return null;
}

HomePage.propTypes = {}

HomePage.contextTypes = {
  router: PropTypes.object,
}

export default HomePage
