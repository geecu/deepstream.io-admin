import debounce from 'lodash.debounce';
import throttle from 'lodash.throttle';
import React, { Component, PropTypes } from 'react';
import Quill from 'quill';
//import InternalLink from '../../quill/InternalLink'; //work in progress, very complicated :D
import inflection from 'inflection';
import Label from './Label';

require('./RichTextInput.css');

class RichTextInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      focused: false,
    }

    this.onTextChange = debounce(this.onTextChange, 500);
    this.onSelectionChange = throttle(this.onSelectionChange, 500);
  }

  componentDidMount() {
    const {
      record,
      source,
      toolbar,
      } = this.props;

    let toolbarOptions = toolbar;
    //if (toolbar === true) {
    //  toolbarOptions = [
    //    [ 'header' ],
    //    [ 'bold', 'italic', 'underline', 'strike' ],
    //    [ 'link', ],
    //    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    //  ]
    //}

    const value = record[source] || '';

    this.quill = new Quill(this.divRef, {
      modules: {
        toolbar: toolbarOptions,
      },
      theme: 'snow',
    });

    this.quill.pasteHTML(value);

    this.editor = this.divRef.querySelector('.ql-editor');
    this.quill.on('text-change', this.onTextChange);
    this.quill.on('selection-change', this.onSelectionChange);
  }

  componentWillUnmount() {
    this.quill.off('text-change', this.onTextChange);
    this.quill.off('selection-change', this.onSelectionChange);
    this.quill = null;
  }

  onSelectionChange = (selection) => {
    this.setState({
      focused: !!selection,
    })
  }

  onTextChange = () => {
    const {
      source,
      onChange,
      } = this.props;

    onChange(source, this.editor.innerHTML);
  }

  updateDivRef = ref => {
    this.divRef = ref;
  }

  render() {
    const {
      source,
      label,
      } = this.props;

    return (
      <div style={ { position: 'relative', paddingTop: 40, } }>
        <Label label={ label || inflection.humanize(source) } focused={ this.state.focused } />
        <div ref={this.updateDivRef} />
      </div>
    );
  }
}

RichTextInput.propTypes = {
  record: PropTypes.object,
  source: PropTypes.string.isRequired,
  label: PropTypes.string,
  options: PropTypes.object,
  includesLabel: PropTypes.bool.isRequired,
  toolbar: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
};

RichTextInput.defaultProps = {
  options: {},
  includesLabel: false,
  toolbar: true,
};

export default RichTextInput;
