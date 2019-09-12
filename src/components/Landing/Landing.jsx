import React from 'react';
import './Landing.scss';
import RouterButton from '../../common/RouterButton/RouterButton';

function Landing() {
  return (
    <div className="landing">
      <div className="title">DateNight</div>
      <div className="description">date ideas simplified.</div>
      <div className="button">
        <RouterButton linkTo="/form">get started</RouterButton>
      </div>
    </div>
  );
}

export default Landing;
