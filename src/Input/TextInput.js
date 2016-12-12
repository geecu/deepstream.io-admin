import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import inflection from 'inflection';

class TextInput extends Component {
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
      type,
      } = this.props;

    const actualLabel = label || inflection.humanize(source);

    return (
      <TextField floatingLabelText={ actualLabel }
                 type={ type }
                 name={ source }
                 defaultValue={ record[source] }
                 fullWidth={ true }
                 onChange={ this.handleChange }
      />
    )
  }
}

TextInput.propTypes = {
  type: PropTypes.string,
}

TextInput.defaultProps = {
  type: 'text',
};

export default TextInput
