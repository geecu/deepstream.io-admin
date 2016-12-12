import React, { PropTypes } from 'react';

const TextField = ({
  record,
  source,
  formatter,
  }) => (
  <div>
    { formatter ? formatter(record[source], record) : record[source] }
  </div>
)

TextField.propTypes = {
  //@TODO ProductList still creates this without the record, check if there's a way to enforce the record, it's needed
  record: PropTypes.object,
  source: PropTypes.string.isRequired,
  formatter: PropTypes.func,
}

export default TextField
