import React, { Children, Component, PropTypes } from 'react';

export default class DeepstreamRecord extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isReady: false,
      record: {},
    }
  }

  componentDidMount() {
    //console.log(this._reactInternalInstance._debugID, 'DR did mount', this.props.dsRecord);
    this.createRecord();
  }

  componentWillUnmount() {
    //console.log(this._reactInternalInstance._debugID, 'DR will unmount', this.props.dsRecord);
    this.destroy();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dsRecord !== this.props.dsRecord) {
      //console.log(this._reactInternalInstance._debugID, 'dsRecord changed from', this.props.dsRecord, 'to', nextProps.dsRecord);
      this.setState({
        isReady: false,
        record: {},
      });

      setTimeout(() => {
        this.destroy();
        setTimeout(() => {
          this.createRecord();
        })
      })
    }
  }

  createRecord = () => {
    const {
      ds,
      dsRecord,
      } = this.props;

    this.record = ds.record.getRecord(dsRecord);

    this.record.subscribe(this.handleServerChange, true);
  }

  destroy = () => {
    if (!this.record) {
      return;
    }

    if (this.record.isDestroyed === false ) {
      //this.record.unsubscribe(this.handleServerChange);
      setTimeout(() => {
        //this.record.discard();
        delete this.record;
      })
    }
  }

  handleServerChange = () => {
    //console.log(this._reactInternalInstance._debugID, 'server changed', this.record.get())
    this.setState({
      isReady: true,
      record: this.record.get()
    });
  }

  handleClientChange = (property, value) => {
    const changesObject = typeof property === 'string' ? {[property]: value} : property;
    this.setState({
      record: {
        ...this.state.record,
        ...changesObject,
      }
    }, () => {
      this.record.set(this.state.record);
    })

    //console.log(this._reactInternalInstance._debugID, 'setting', property, value);
  }

  render() {
    const {
      isReady,
      record,
      } = this.state;
    const {
      ds,
      dsRecord,
      children,
      ...otherProps
      } = this.props;

    if (!isReady) {
      return null;
    }

    //console.log(this._reactInternalInstance._debugID, 'DR rendering', dsRecord, record, this.record.isReady);


    //@TODO Check why children is array (even though only one child is passed) with the first element being null
    const onlyChild = Children.toArray(children).filter(child => child)[0];

    return React.cloneElement(Children.only(onlyChild), {
      dsRecord,
      record,
      onChange: this.handleClientChange,
      ...otherProps,
      ...onlyChild.props,
    });
  }
}

DeepstreamRecord.propTypes = {
  ds: PropTypes.object.isRequired,
  dsRecord: PropTypes.string.isRequired,
}
