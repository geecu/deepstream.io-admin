import React, {
  Children,
  Component,
} from 'react';
import {
  Router,
  IndexRoute,
  Route,
  withRouter,
} from 'react-router';

import Layout from './Layout/Layout';
import HomePage from './Page/HomePage';
import LoginPage from './Page/LoginPage';
import RecordPage from './Page/RecordPage';
import Resource from './Resource';

const isResource = (child) => child.type.displayName === Resource.displayName;

class App extends Component {
  render() {
    const {
      history,
      ds,
      title,
      children,
      menu,
      } = this.props;

    const checkAdmin = (nextState, replace, callback) => {
      if (ds.getConnectionState() !== 'OPEN') {
        if (nextState.location && nextState.location.pathname === '/login') {
          return callback();
        }

        if (nextState.location) {
          //https://github.com/ReactTraining/react-router/issues/1066 - not sure if there's a better way to pass the referrer to the login component
          window.dsAdminReferrer = nextState.location;
        }

        replace('/login');
      }

      callback();
    };

    const withDS = (Component) => withProps(Component, { ds });
    const withProps = (Component, extraProps) => (props) => (<Component { ...extraProps } { ...props } />);

    const resources = Children
      .map(children, child => isResource(child) && child.props)
      .filter(resource => resource);

    return (
      <Router history={ history }>
        <Route path="/" component={ withRouter(withProps(Layout, {
            title,
            ds,
            resources,
            menu,
            })) }>
          <IndexRoute component={ withDS(HomePage) } />
          <Route path="admin" onEnter={ checkAdmin }>
            {
              resources.map(resource =>
                <Route path={ resource.name }
                       key={ resource.name }
                       component={ withProps(RecordPage, {
                         ds,
                         dsRecord: resource.name,
                         ...resource,
                         })
                       }
                />)
            }
            {
              Children.map(children, child => !isResource(child) && child)
            }
          </Route>
          <Route path="login" component={ withProps(withDS(LoginPage), { resources }) } />
        </Route>
      </Router>
    );

    return (
      <Router routes={ routes(ds) } history={ history } />
    );
  }
}

App.propTypes = {
  history: React.PropTypes.object.isRequired,
};

export default App;
