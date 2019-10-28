/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
// import { Link } from 'react-router-dom';
import './Nav.scss';
import { useAuth0 } from '../authHook';

function Nav() {
  const {
    isAuthenticated,
    loginWithRedirect,
    logout,
    user,
  } = useAuth0();

  return (
    <div className="nav">
      <div className="logo">
        {/* <Link to="/">DateNight</Link> */}
        DateNight
      </div>

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

Nav.defaultProps = {
};

Nav.propTypes = {
};

export default Nav;
