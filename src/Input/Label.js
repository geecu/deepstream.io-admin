import React, { PropTypes } from 'react';
import TextFieldLabel from 'material-ui/TextField/TextFieldLabel';
import { fade } from 'material-ui/utils/colorManipulator';

const Label = (props, context) => {
  const {
    muiTheme,
    muiTheme: {
      textField: {
        focusColor,
        floatingLabelColor,
        },
      },
    } = context;

  const {
    label,
    focused,
    } = props;

  const labelStyles = {
    fontSize: 16,
    color: focused ? focusColor : fade(floatingLabelColor, .5),
  };

  return (
    <TextFieldLabel muiTheme={ muiTheme }
                    shrink={ true }
                    style={ labelStyles }
    >
      { label }
    </TextFieldLabel>
  )
}

Label.propTypes = {
  label: PropTypes.string.isRequired,
  focused: PropTypes.bool,
}

Label.contextTypes = {
  muiTheme: PropTypes.object.isRequired,
};

export default Label
