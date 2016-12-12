import React, { PropTypes } from 'react';
import ViewListIcon from 'material-ui/svg-icons/action/view-list';

const componentPropType = PropTypes.oneOfType([PropTypes.func, PropTypes.string]);

const Resource = () => <span>&lt;Resource&gt; elements are for configuration only and should not be rendered</span>;

Resource.propTypes = {
  name: PropTypes.string.isRequired,
  list: componentPropType,
  edit: componentPropType,
  create: componentPropType,
  remove: componentPropType,
  icon: componentPropType,
  options: PropTypes.object,
  allowDelete: PropTypes.bool,
};

Resource.defaultProps = {
  icon: ViewListIcon,
  options: {},
  allowDelete: true,
};

Resource.displayName = 'Resource';

export default Resource;
