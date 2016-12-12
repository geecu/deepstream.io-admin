import React, { Component, PropTypes } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import inflection from 'inflection';

class SelectInput extends Component {
  handleChange = (ev, index, value) => {
    const {
      source,
      onChange,
      } = this.props;

    onChange(source, value);
  }

  render() {
    const {
      record,
      localRecord,
      label,
      source,
      type,
      options,
      } = this.props;

    const actualLabel = label || inflection.humanize(source);
    const value = localRecord[source] || record[source];

    return (
      <SelectField floatingLabelText={ actualLabel }
                 type={ type }
                 name={ source }
                 value={ value }
                 fullWidth={ true }
                 onChange={ this.handleChange }
      >
        {
          options.map(option =>
            <MenuItem key={ option.value || '-' }
                      value={ option.value }
                      primaryText={ option.label }
            />
          )
        }
      </SelectField>
    )
  }
}

SelectInput.propTypes = {
  options: PropTypes.array.isRequired,
}

SelectInput.defaultProps = {
};

export default SelectInput
