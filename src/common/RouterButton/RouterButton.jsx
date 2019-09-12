import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './RouterButton.scss';

function RouterButton(props) {
  const { children, linkTo } = props;

  return (
    <Link to={linkTo}>
      <div className="routerButton">
        { children }
      </div>
    </Link>
  );
}

RouterButton.defaultProps = {
  children: '',
};

RouterButton.propTypes = {
  children: PropTypes.string,
  linkTo: PropTypes.string.isRequired,
};

export default RouterButton;
