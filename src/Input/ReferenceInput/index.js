import React, { Component, PropTypes } from 'react';

import DeepstreamList from '../../Deepstream/DeepstreamList';
import AutoComplete from 'material-ui/AutoComplete';
import ReferenceList from './ReferenceList';

class ReferenceInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: '',
      dataSource: [],
      records: [],
      recordIds: [],
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      ds,
      entries,
      } = nextProps;

    entries.map(recordId => {
      const {
        recordIds,
        } = this.state;

      if (recordIds.find(existingRecordId => existingRecordId === recordId)) {
        return;
      }

      const record = ds.record.getRecord(recordId);
      record.whenReady(() => {
        const {
          records,
          recordIds,
          } = this.state;

        if (recordIds.find(existingRecordId => existingRecordId === recordId)) {
          return;
        }

        recordIds.push(recordId);
        records.push(record.get());
        console.log('pushing', recordId);

        this.setState({
          records,
          recordIds,
        })
      })
    })
  }

  handleNewRequest = (option) => {
    const {
      multiple,
      onChange,
      value,
      } = this.props;

    if (multiple) {
      onChange([...value, option.value]);
    } else {
      onChange(option.value)
    }

    this.setState({
      searchText: '',
    })
  }

  handleUpdateInput = (t) => {
    this.setState({
      searchText: t
    })
  }

  render() {
    const {
      label,
      hintText,
      entries,
      value,
      multiple,
      recordTextProperty,
      textRenderer,
      } = this.props;

    const {
      records,
      searchText,
      } = this.state;

    if (!recordTextProperty && !textRenderer) {
      console.error('Neither recordTextProperty nor textRenderer were passed to ReferenceInput')
    }

    const valueArr = multiple ? value : [ value ];

    const dataSource = records
      .map(
        (record, idx) =>
          ({
            text: textRenderer ? React.cloneElement(textRenderer, { record }) : record[recordTextProperty],
            value: entries[idx],
          })
      )
      .filter(
        ({ value }) =>
          !valueArr.includes(value)
      )


    return (
      <div>
        <AutoComplete
          hintText={ hintText }
          dataSource={ dataSource }
          floatingLabelText={ label }
          fullWidth={ true }
          filter={ AutoComplete.fuzzyFilter }
          onUpdateInput={ this.handleUpdateInput }
          onNewRequest={ this.handleNewRequest }
          searchText={ searchText }
        />
        <ReferenceList { ...this.props }
          records={ this.state.records }
          details={ {} }
        />
      </div>
    )
  }
}

ReferenceInput.propTypes = {
  ds: PropTypes.object.isRequired,
  dsList: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  hintText: PropTypes.string,
  multiple: PropTypes.bool,
  recordTextProperty: PropTypes.string,
  textRenderer: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]).isRequired,
}

ReferenceInput.defaultProps = {
  hintText: 'Type to select',
  multiple: false,
}

export ReferenceList from './ReferenceList';

export default (props) => (
    <DeepstreamList ds={ props.ds } dsList={ props.dsList }>
      <ReferenceInput { ...props } />
    </DeepstreamList>
)

