import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { AppSidebarToggler } from '@coreui/react';

const propTypes = {
    headerName: PropTypes.string
};

const defaultProps = {
    headerName: "Name portal"
};

class DefaultHeader extends Component {
  render() {

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <div className="mx-auto">
          <h3>{this.props.headerName}</h3>
        </div>
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
