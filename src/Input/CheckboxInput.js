import React, { Component, PropTypes } from 'react';
import Checkbox from 'material-ui/Checkbox';

class CheckboxInput extends Component {
  handleChange = (ev, value) => {
    const {
      source,
      onChange,
      } = this.props;

    onChange(source, value);
  }

  render() {
    const {
      record,
      label,
      source,
      } = this.props;

    const actualLabel = label || inflection.humanize(source);

    return (
      <Checkbox
        label={ actualLabel }
        defaultChecked={ record[source] === true }
        onCheck={ this.handleChange }
        style={ { marginTop: 20 } }
      />
    )
  }
}

CheckboxInput.propTypes = {}

export default CheckboxInput;
