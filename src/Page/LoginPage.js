import React, { Component, PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Icon from 'material-ui/svg-icons/communication/vpn-key';

import styles from '../styles';

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        username: null,
        password: null,
      },
      loggingIn: false,
    }
  }

  componentDidMount() {
    const { router } = this.context;
    const {
      location,
      } = this.props;
    const loginStr = localStorage.getItem('login');

    if (loginStr) {
      const user = JSON.parse(loginStr);
      this.setState({
        user
      }, () => {
        this.doLogin();
      })
    }
  }

  handleChange = (ev, value) => {
    this.setState({
      user: {
        ...this.state.user,
        [ev.target.name]: value,
      },
    })
  }

  handleLogin = () => {
    this.doLogin();
  }

  doLogin = () => {
    this.setState({
      loggingIn: true,
    })

    const {
      ds,
      resources,
      } = this.props;
    const { user } = this.state;
    const { router } = this.context;
    console.log('logging in', user)

    ds.close();
    ds
      .login(user, (success, data) => {
        this.setState({ loggingIn: false })
        if (success) {
          localStorage.setItem('login', JSON.stringify(user));

          if (window.dsAdminReferrer) {
            router.push(window.dsAdminReferrer.pathname);
          } else {
            router.push(`/admin/${resources[0].name}`)
          }
        } else {
          this.setState({ error: 'Invalid username/password' })
        }
      })
    ;
  }

  render () {
    return (
      <Paper style={ styles.loginPaper }>
        <TextField floatingLabelText="Username"
                   name="username"
                   onChange={ this.handleChange }
                   fullWidth={ true }
        />
        <TextField floatingLabelText="Password"
                   name="password"
                   type="password"
                   onChange={ this.handleChange }
                   fullWidth={ true }
        />
        <div style={ { textAlign: 'right' }}>
          <FlatButton
            label="Login"
            primary={ true }
            icon={ <Icon /> }
            onTouchTap={ this.handleLogin }
            disabled={ this.state.loggingIn }
          />
        </div>
      </Paper>
    )
  }
}

LoginPage.propTypes = {
  ds: PropTypes.object.isRequired,
}

LoginPage.contextTypes = {
  router: PropTypes.object.isRequired,
};

export default LoginPage
