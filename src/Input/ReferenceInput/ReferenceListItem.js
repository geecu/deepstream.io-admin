import React, { PropTypes } from 'react';

import { SortableItemMixin } from 'react-anything-sortable';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ActionReorder from 'material-ui/svg-icons/action/reorder';

import styles from '../../styles';

const Fix = ({sortHandle, children, ...otherProps}) => {
  return React.cloneElement(children, otherProps);
}

const ReferenceListItem = React.createClass({
  mixins: [SortableItemMixin],

  render() {
    const {
      className,
      withSort,
      itemId,
      record,
      recordTextProperty,
      textRenderer,
      details,
      onChange,
      } = this.props;

    const color = '#777';
    const size = 16;

    return this.renderWithSortable(
      <Fix>
        <div className={ className }>
          <div style={ styles.sortableItem }>
            <div className="content" style={ styles.sortableContent }>
              {
                textRenderer ?
                  React.cloneElement(textRenderer, {
                    record,
                    itemId,
                    onChange,
                    value: details,
                  })
                  : record[recordTextProperty]
              }
            </div>
            <div className="actions" style={ styles.sortableActions }>
              <ActionDelete onTouchTap={ this.props.onDelete }
                            color={ color }
                            hoverColor="#c00000"
                            style={ {
                              cursor: 'pointer',
                              width: size,
                              height: size,
                              marginRight: 10,
                             }}
              />
              { withSort ?
                <span className="handle" style={{
                                        display: 'inline-block',
                                        cursor: 'move',
                                        }}>
                  <ActionReorder color={ color }
                                 hoverColor="#333"
                                 style={ {
                                  cursor: 'move',
                                  width: size,
                                  height: size,
                                  pointerEvents: 'none',
                                 }}
                  />
                </span>
                : null }
            </div>
          </div>
        </div>
      </Fix>
    )
  }
})

export default ReferenceListItem;
