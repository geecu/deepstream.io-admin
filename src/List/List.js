import React, { PropTypes } from 'react';
import { Card, CardTitle, CardActions } from 'material-ui/Card';
import DeepstreamList from '../Deepstream/DeepstreamList';

const List = ({
  title,
  ds,
  dsRecord,
  detailRecord,
  children,
  onSelectRecord,
  }) => {
  return (
    <Card>
      <CardTitle title={ title } />
      <DeepstreamList ds={ ds } dsList={ dsRecord }>
        {
          React.cloneElement(children, {
            ds,
            detailRecord,
            onSelectRecord,
          })
        }
      </DeepstreamList>
    </Card>
  )
}

List.propTypes = {}

export default List
