import React, { PropTypes } from 'react';
import {
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const Row = React.createClass({
  render() {
    const {
      dsRecord,
      record,
      fields,
      ...otherProps,
      } = this.props;

    return (
      <TableRow { ...otherProps }>
        {
          fields.map((field, idx) =>
            <TableRowColumn key={ idx }>
              <field.type { ...field.props } record={ record } />
            </TableRowColumn>
          )
        }
      </TableRow>
    )
  }
});

export default Row;
