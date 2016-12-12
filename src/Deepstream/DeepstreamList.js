import React, { Children, Component, PropTypes } from 'react';

export default class DeepstreamList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      entries: [],
    }
  }

  componentDidMount() {
    this.subscribe();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dsList !== this.props.dsList) {
      setTimeout(() => {
        this.unsubscribe();
        this.subscribe();
      })
    }
  }

  subscribe() {
    const {
      ds,
      dsList,
      } = this.props;

    //When unmounting a DSList and remounting it in another component, DS client gives an error.
    //Make sure the subscription is happening *after* the unmount
    //@TODO: Check an updated version of the DS client to see if this was fixed
    setTimeout(() => {
      this.list = ds.record.getList( dsList );

      this.list.whenReady(list => {
        const entries = list.getEntries();

        this.handleListEntries(entries)
      });

      this.list.subscribe(this.handleListEntries);
    }, 1)
  }

  unsubscribe() {
    //this.list.unsubscribe(this.handleListEntries);
    //this.list.discard();
    delete this.list;
  }

  handleListEntries = (entries) => {
    this.setState({ entries });
  }

  handleAddEntry = (entryId, idx) => {
    const {
      ds,
      dsList,
      } = this.props;

    entryId = entryId || `${dsList}/${ds.getUid()}`

    this.list.addEntry(entryId, idx);
  }

  render() {
    const {
      children,
      } = this.props;

    const {
      entries,
      } = this.state;

    const props = {
      addEntry: this.handleAddEntry,
      entries,
    };

    return React.cloneElement(Children.only(children), props);
  }
}

DeepstreamList.propTypes = {
  ds: PropTypes.object.isRequired,
  dsList: PropTypes.string.isRequired,
}

DeepstreamList.defaultProps = {
}
