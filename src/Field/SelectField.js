import React, { PropTypes } from 'react';

const SelectField = ({
  record,
  source,
  options,
  }) => (
  <div>
    { (options.find(option => option.value === record[source]) || {}).label || `${record[source]}` }
  </div>
)

SelectField.propTypes = {
  record: PropTypes.object,
  source: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  formatter: PropTypes.func,
}

export default SelectField
