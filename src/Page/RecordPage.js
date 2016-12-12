import React, { Component, PropTypes } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import inflection from 'inflection';

import styles from '../styles';
import { DetailDrawer } from '../Detail';

const DETAIL_CLOSE_WAIT = 100;

class RecordPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      detailOpen: false,
      detailView: null,
      detailRecord: null,
    }
  }

  componentDidMount() {
    const {
      ds,
      dsRecord,
      } = this.props;

    this.list = ds.record.getList(dsRecord);
  }

  handleCreateClick = (ev) => {
    const {
      ds,
      dsRecord,
      } = this.props;

    this.list.whenReady(() => {
      const id = `${dsRecord}/${ds.getUid()}`;
      this.list.addEntry(id);

      this.setState({
        detailOpen: true,
        detailView: 'create',
        detailRecord: id,
      })
    })
  }

  handleSelectRecord = (dsRecord) => {
    this.setState({
      detailOpen: !!dsRecord,
      detailView: 'edit',
      detailRecord: dsRecord,
    })
  }

  handleCloseDetail = () => {
    this.setState({
      detailOpen: false,
    })

    setTimeout(() => {
      //setting detailRecord to null right away shows the create form in the drawer while it's exiting screen
      this.setState({
        detailView: null,
        detailRecord: null,
      })
    }, DETAIL_CLOSE_WAIT)
  }

  handleDeleteClick = () => {
    const {
      ds,
      } = this.props;
    const {
      detailRecord,
      } = this.state;

    this.list.whenReady(() => {
      this.handleCloseDetail();
      setTimeout(() => {
        ds.record.getRecord(detailRecord).delete();
        this.list.removeEntry(detailRecord);
      }, DETAIL_CLOSE_WAIT)
    })
  }

  render() {
    let {
      ds,
      dsRecord,
      title,
      list,
      create,
      edit,
      allowDelete,
      } = this.props;
    title = title || inflection.humanize(inflection.pluralize(dsRecord));

    const {
      detailOpen,
      detailView,
      detailRecord,
      } = this.state;

    return (
      <div>
        <DetailDrawer open={ detailOpen }
                      view={ detailView }
                      create={ create }
                      edit={ edit }
                      ds={ ds }
                      dsRecord={ detailRecord }
                      onClose={ this.handleCloseDetail }
                      onDelete={ allowDelete && this.handleDeleteClick }
        />
        {
          React.createElement(list, {
            ds,
            title,
            dsRecord,
            detailRecord,
            onSelectRecord: this.handleSelectRecord,
          })
        }
        {
          create ?
            <FloatingActionButton style={ styles.createBtn }
                                  onTouchTap={ this.handleCreateClick }>
              <ContentAdd />
            </FloatingActionButton>
            : null
        }
      </div>
    )
  }
}

RecordPage.propTypes = {}

export default RecordPage
