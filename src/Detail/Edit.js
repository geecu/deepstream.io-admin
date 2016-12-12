import React, { Component, Children, PropTypes } from 'react';
import {
  CardActions,
  CardText
} from 'material-ui/Card';
import inflection from 'inflection';
import {
  RaisedButton,
} from 'material-ui';
import Save from 'material-ui/svg-icons/content/save';
import Delete from './Delete';

class Edit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dirty: false,
      record: {},
    };
  }

  componentDidMount() {
    this.setState({
      record: {
        ...this.props.record,
      }
    })
  }

  handleSaveClick = () => {
    this.setState({
      dirty: false,
    })

    this.props.onChange(this.state.record);
  }

  handleInputChange = (property, value) => {
    //console.log('edit onchange', property, value)
    //this.props.onChange(property, value);
    this.setState({
      dirty: true,
      record: {
        ...this.state.record,
        [property]: value,
      }
    })
  }

  render() {
    const {
      ds,
      dsRecord,
      record,
      onChange,
      onDelete,
      children,
      ...otherProps,
      } = this.props;
    const {
      dirty,
      record: localRecord,
      } = this.state;

    return (
      <div>
        <CardText { ...otherProps }>
          {
            Children.toArray(children).map((field, idx) => {
              if (!field.props.source) {
                return <field.type key={ idx } { ...field.props } />
              }

              const label = field.props.label || inflection.humanize(field.props.source);

              return (
                <div key={ `${idx}` }>
                  <field.type { ...field.props }
                    label={ label }
                    onChange={ this.handleInputChange }
                    record={ record }
                    localRecord={ localRecord }
                  />
                </div>
              )
            })
          }
        </CardText>
        <CardActions { ...otherProps } style={ { overflow: 'hidden', clear: 'both' } }>
          <RaisedButton icon={ <Save /> }
                        label="Save"
                        primary={ true }
                        disabled={ !dirty }
                        style={ { float: 'right', }}
                        onTouchTap={ this.handleSaveClick }
          />
          { onDelete ? <Delete onDelete={ onDelete } /> : null }
        </CardActions>
      </div>
    )
  }
}

export default Edit;
