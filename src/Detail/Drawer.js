import React, { PropTypes } from 'react';
import Drawer from 'material-ui/Drawer';
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia, CardTitle, CardText} from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import DeepstreamRecord from '../Deepstream/DeepstreamRecord';

import styles from '../styles';

const DetailDrawer = ({
  open,
  view,
  create,
  edit,
  ds,
  dsRecord,
  onClose,
  onDelete,
  }) => {

  if (!dsRecord) {
    return null;
  }

  let title, detail;
  switch (view) {
    case 'edit':
      title = 'Edit';
      detail = <DeepstreamRecord key={ dsRecord } ds={ ds } dsRecord={ dsRecord }>
        {
          React.createElement(edit, {
            key: dsRecord,
            ds,
            onDelete,
            dsRecord,
          })
        }
        </DeepstreamRecord>
      break;
    case 'create':
      title = 'Create';
      detail = <DeepstreamRecord key={ dsRecord } ds={ ds } dsRecord={ dsRecord }>
        {
          React.createElement(create, {
            key: dsRecord,
            dsRecord,
          })
        }
        </DeepstreamRecord>
      break;
  }

  return (
    <Drawer width={ 600 }
            openSecondary={ true }
            {...{
              open,
            }}>
      <Card style={ styles.detailCard }>
        <CardHeader title={ title }>
          <IconButton tooltip="Close"
                      onTouchTap={ onClose }
                      style={ styles.detailCloseBtn }>
            <NavigationClose color="#aaa"
                             hoverColor="#666" />
          </IconButton>
        </CardHeader>
        { detail }
      </Card>
    </Drawer>
  )
}

DetailDrawer.propTypes = {}

export default DetailDrawer
