import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
  const { children, value, index} = props;
  return <Box>{children}</Box>;
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export default TabPanel;
