import React, { Children, Component, PropTypes } from 'react';
import inflection from 'inflection';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import Row from './Row';
import DeepstreamRecord from '../Deepstream/DeepstreamRecord';

class DeepstreamDataGrid extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  handleSelectRecord = ([rowIdx]) => {
    const rowId = this.entries[rowIdx];

    this.props.onSelectRecord(rowId);
  }

  get entries() {
    const {
      entries,
      entriesProcessor,
      } = this.props;

    return entriesProcessor && entriesProcessor(entries) || entries;
  }

  render() {
    const {
      ds,
      detailRecord,
      children,
      entries,
      entriesProcessor,
      } = this.props;
    const {
      } = this.state;

    return (
      <div>
        <Table selectable={ true }
               onRowSelection={ this.handleSelectRecord }>
          <TableHeader displaySelectAll={ false }
                       adjustForCheckbox={ false }>
            <TableRow>
              {
                Children.toArray(children).map(({props: {label, source, }}, idx) =>
                  <TableHeaderColumn key={ idx }>
                    { label || inflection.humanize(source) }
                  </TableHeaderColumn>
                )
              }
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={ false }
                     deselectOnClickaway={ false }
                     showRowHover={ true }
                     stripedRows={ false }>
            {
              this.entries.map(row => (
                <DeepstreamRecord key={ row }
                                  ds={ ds }
                                  dsRecord={ row }>
                  <Row key={ row }
                       selected={ detailRecord === row }
                       fields={ children } />
                </DeepstreamRecord>
              ))
            }
            {
              !this.entries.length ?
                <TableRow>
                  <TableRowColumn colSpan={ children.length }>
                    <div style={ { color: '#c00000', textAlign: 'center', fontWeight: 'bold' } }>
                      No records
                    </div>
                  </TableRowColumn>
                </TableRow>
                : null
            }
          </TableBody>
        </Table>
      </div>
    )
  }
}

DeepstreamDataGrid.propTypes = {
  entriesProcessor: PropTypes.func,
};

DeepstreamDataGrid.defaultProps = {
}

export default DeepstreamDataGrid;
