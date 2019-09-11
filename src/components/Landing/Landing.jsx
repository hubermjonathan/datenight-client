import React from 'react';
import './Landing.scss';
import RouterButton from '../../common/RouterButton/RouterButton';

function Landing() {
  return (
    <div>
      <h1 className="title">DateNight</h1>
      <h3 className="description">date ideas simplified.</h3>
      <RouterButton linkTo="/">get started</RouterButton>
    </div>
  );
}

export default Landing;
