import React, { useState } from 'react';
import './Form.scss';
import RouterButton from '../../common/RouterButton/RouterButton';

function Form() {
  const [location, setLocation] = useState('');
  const [priceRange, setPriceRange] = useState(1);
  const [type, setType] = useState('anything');
  const [minTime, setMinTime] = useState('');
  const [maxTime, setMaxTime] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);

  function onChangeLocation(event) {
    setLocation(event.target.value);
    if (event.target.value !== '') {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }

  function onChangePriceRange(event) {
    setPriceRange(event.target.value);
  }

  function onChangeType(event) {
    setType(event.target.value);
  }

  function onChangeMinTime(event) {
    const newValue = parseInt(event.target.value, 10);
    if (newValue < 0) {
      setMinTime(0);
    } else if (maxTime !== '' && newValue > maxTime) {
      setMinTime(maxTime);
    } else {
      setMinTime(newValue);
    }
  }

  function onChangeMaxTime(event) {
    const newValue = parseInt(event.target.value, 10);
    if (newValue > 10) {
      setMaxTime(10);
    } else if (minTime !== '' && newValue < minTime) {
      setMaxTime(minTime);
    } else {
      setMaxTime(newValue);
    }
  }

  function handleSubmit() {
    const formData = {
      location,
      priceRange,
      type,
      minTime,
      maxTime,
    };

    // eslint-disable-next-line no-console
    console.log(formData);
  }

  return (
    <div className="form">
      <div className="card">
        <div className="cardTitle">tell us what you&apos;re looking for</div>

        <div className="locationInput">
          <div className="inputLabel">where are you?</div>
          <input className="form-control" onChange={onChangeLocation} value={location} />
        </div>

        <div className="priceRangeInput">
          <div className="inputLabel">what&apos;s your price range?</div>
          <select className="form-control" onChange={onChangePriceRange} value={priceRange}>
            <option value="1">$</option>
            <option value="2">$$</option>
            <option value="3">$$$</option>
          </select>
        </div>

        <div className="typeInput">
          <div className="inputLabel">what kind of dates are you looking for?</div>
          <select className="form-control" onChange={onChangeType} value={type}>
            <option>anything</option>
            <option>entertainment</option>
            <option>food</option>
            <option>nightlife</option>
            <option>shopping</option>
          </select>
        </div>

        <div className="timeInputs">
          <div className="inputLabel">how long do you want it to be?</div>
          <div className="form-row">
            <div className="col">
              <input className="form-control minTimeInput" type="number" onChange={onChangeMinTime} value={minTime} />
            </div>

            <div className="col-3 inputLabel">
              hour(s)
            </div>

            <div className="col-1 inputLabel">
              to
            </div>

            <div className="col">
              <input className="form-control maxTimeInput" type="number" onChange={onChangeMaxTime} value={maxTime} />
            </div>

            <div className="col-3 inputLabel">
            hour(s)
            </div>
          </div>
        </div>

        <div className="submitButton">
          <RouterButton linkTo="/" onClick={handleSubmit} disabled={buttonDisabled}>find dates</RouterButton>
        </div>
      </div>
    </div>
  );
}

export default Form;
