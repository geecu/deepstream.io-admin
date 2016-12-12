import React, { Component, PropTypes } from 'react';
import Sortable from 'react-anything-sortable';

import ReferenceListItem from './ReferenceListItem';

class ReferenceList extends Component {
  renderItem = (itemId, idx) => {
    const {
      records,
      entries,
      details,
      } = this.props;

    return (
      <ReferenceListItem key={ `${itemId}-${idx}`}
                         { ...this.props }
                         className="sort-item"
                         onDelete={ this.handleDelete.bind(this, idx) }
                         itemId={ itemId }
                         record={ records[entries.indexOf(itemId)] || {} }
                         details={ details[itemId] }
                         withSort={ this.props.multiple }
                         sortData={ idx }
                         onChange={ value => this.handleDetailsChanged(itemId, value) }
      />
    )
  }

  handleSort = (order) => {
    const ordered = order.map(idx => this.props.value[idx]);
    this.props.onChange(ordered);
  }

  handleDelete = (idx) => {
    const {
      multiple,
      value,
      details,
      onChange,
      onDetailsChange,
      } = this.props;

    if (multiple) {
      const newValue = value.slice(0);
      const itemId = newValue.splice(idx, 1);
      onChange(newValue);

      delete details[itemId];

      onDetailsChange(details);
    } else {
      onChange(null);
      onDetailsChange({});
    }
  }

  handleDetailsChanged = (itemId, value) => {
    const {
      details,
      onDetailsChange,
      } = this.props;

    let newDetails = JSON.parse(JSON.stringify(details));

    newDetails[itemId] = value;

    onDetailsChange(newDetails);
  }

  render() {
    const {
      value,
      multiple,
      } = this.props;

    return (
      <div className="sort-list">
        { multiple ?
          <Sortable sortHandle="handle"
                    dynamic={ true }
                    direction="vertical"
                    onSort={ this.handleSort }>
            { value.map(this.renderItem) }
          </Sortable>
          : this.renderItem(value) }
      </div>
    )
  }
}

export default ReferenceList;
