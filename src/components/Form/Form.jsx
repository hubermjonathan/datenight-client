import React from 'react';
import './Form.scss';
import RouterButton from '../../common/RouterButton/RouterButton';

function Form() {
  return (
    <div className="form">
      <div className="card">
        <div className="cardTitle">tell us what you&apos;re looking for</div>

        <div className="locationInput">
          <div className="inputLabel">where are you?</div>
          <input />
        </div>

        <div className="priceRangeInput">
          <div className="inputLabel">what&apos;s your price range?</div>
          <input />
        </div>

        <div className="typeInput">
          <div className="inputLabel">what kind of dates are you looking for?</div>
          <input />
        </div>

        <div className="timeInputs">
          <div className="inputLabel">how long do you want it to be?</div>
          <input />
          <input />
        </div>

        <div className="submitButton">
          <RouterButton linkTo="/">find dates</RouterButton>
        </div>
      </div>
    </div>
  );
}

export default Form;
