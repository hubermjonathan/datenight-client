import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './RouterButton.scss';

function RouterButton(props) {
  const { children, linkTo, disabled } = props;

  if (disabled) {
    return (
      <div className="routerButtonDisabled">
        {children}
      </div>
    );
  }

  return (
    <Link to={linkTo}>
      <div className="routerButton">
        {children}
      </div>
    </Link>
  );
}

RouterButton.defaultProps = {
  children: '',
  disabled: false,
};

RouterButton.propTypes = {
  children: PropTypes.string,
  linkTo: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

export default RouterButton;
