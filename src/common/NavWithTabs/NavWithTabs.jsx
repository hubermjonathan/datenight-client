/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import './NavWithTabs.scss';
import { useAuth0 } from '../authHook';

function NavWithTabs(props) {
  const {
    currentPage,
    onClickMap,
    onClickList,
    onClickPlans,
  } = props;
  const {
    isAuthenticated,
    loginWithRedirect,
    logout,
    user,
  } = useAuth0();
  const mapTabClassName = currentPage === 'map' ? 'tab active' : 'tab';
  const listTabClassName = currentPage === 'list' ? 'tab active' : 'tab';
  const plansTabClassName = currentPage === 'plans' ? 'tab active' : 'tab';

  return (
    <div className="navWithTabs">
      <div className="logo">
        {/* <Link to="/">DateNight</Link> */}
        DateNight
      </div>

      {currentPage === 'map' && (
        <div className="tabs">
          <div className={mapTabClassName}>Map</div>
          <div onClick={onClickList} className={listTabClassName}>List</div>
          {isAuthenticated && <div onClick={onClickPlans} className={plansTabClassName}>Plans</div>}
        </div>
      )}
      {currentPage === 'list' && (
        <div className="tabs">
          <div onClick={onClickMap} className={mapTabClassName}>Map</div>
          <div className={listTabClassName}>List</div>
          {isAuthenticated && <div onClick={onClickPlans} className={plansTabClassName}>Plans</div>}
        </div>
      )}
      {currentPage === 'plans' && (
        <div className="tabs">
          <div onClick={onClickMap} className={mapTabClassName}>Map</div>
          <div onClick={onClickList} className={listTabClassName}>List</div>
          {isAuthenticated && <div className={plansTabClassName}>Plans</div>}
        </div>
      )}

      <div className="account">
        {!isAuthenticated && (
          <button className="button" type="button" onClick={() => loginWithRedirect({})}>
            Log In
            <i className="fas fa-user-circle" />
          </button>
        )}

        {isAuthenticated && (
          <button className="button" type="button" onClick={() => logout()}>
            Hello, {user.name}
            <i className="fas fa-user-circle" />
          </button>
        )}
      </div>
    </div>
  );
}

NavWithTabs.defaultProps = {
};

NavWithTabs.propTypes = {
  currentPage: PropTypes.string.isRequired,
  onClickMap: PropTypes.func.isRequired,
  onClickList: PropTypes.func.isRequired,
  onClickPlans: PropTypes.func.isRequired,
};

export default NavWithTabs;
