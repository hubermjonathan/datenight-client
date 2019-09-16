import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Nav.scss';

function Nav(props) {
  const { currentPage } = props;
  const mapTabClassName = currentPage === 'map' ? 'tab active' : 'tab';
  const listTabClassName = currentPage === 'list' ? 'tab active' : 'tab';

  return (
    <div className="nav">
      <div className="logo">
        <Link to="/">DateNight</Link>
      </div>

      { currentPage === 'map' && (
        <div className="tabs">
          <div className={mapTabClassName}>Map</div>
          <Link to="/list"><div className={listTabClassName}>List</div></Link>
        </div>
      )}
      { currentPage === 'list' && (
        <div className="tabs">
          <Link to="/map"><div className={mapTabClassName}>Map</div></Link>
          <div className={listTabClassName}>List</div>
        </div>
      )}

      <div className="account">
        <Link to="/sign-in">
          <i className="fas fa-user-circle" />
        </Link>
      </div>
    </div>
  );
}

Nav.defaultProps = {
};

Nav.propTypes = {
  currentPage: PropTypes.string.isRequired,
};

export default Nav;
