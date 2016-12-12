import React, { Children, Component, PropTypes } from 'react';

class Provider extends Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  getChildContext() {
    return {
      ds: this.props.ds,
    };
  }

  render() {
    const {
      children,
      } = this.props;

    const child = Children.only(children);

    return child;
  }
}

Provider.propTypes = {
  ds: PropTypes.object.isRequired,
}

Provider.childContextTypes = {
  ds: PropTypes.object,
};

export default Provider;
