import React, { useState } from 'react';
import { Redirect } from 'react-router';
import './Form.scss';

function Form() {
  const [location, setLocation] = useState('');
  const [priceRange, setPriceRange] = useState(1);
  const [type, setType] = useState('anything');
  const [minTime, setMinTime] = useState('');
  const [maxTime, setMaxTime] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [pins, setPins] = useState([]);
  const [redirect, setRedirect] = useState(false);

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
    } else if (newValue > 10) {
      setMinTime(10);
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
    } else if (newValue < 0) {
      setMaxTime(0);
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

    // eslint-disable-next-line no-unused-vars
    const data = [
      {
        location: {
          lat: 37.250204,
          lng: -121.844305,
        },
        name: 'Happy Lemon',
        phone: '(408) 622-6785',
        website: 'postmates.com',
        hours: 'open until 10pm today',
      },
      {
        location: {
          lat: 37.321751,
          lng: -121.971519,
        },
        name: '7 Leaves',
        phone: '(408) 618-8401',
        website: 'no website',
        hours: 'open until 11pm today',
      },
      {
        location: {
          lat: 37.420849,
          lng: -121.916505,
        },
        name: 'Fantasia',
        phone: '(408) 260-1668',
        website: 'doordash.com',
        hours: 'open until 10pm today',
      },
    ];

    setPins(data);
    setRedirect(true);

    // eslint-disable-next-line no-console
    console.log(formData);
  }

  if (redirect) {
    return (
      <Redirect to={{
        pathname: '/map',
        state: { pins },
      }}
      />
    );
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
            <option value="4">$$$$</option>
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

        <button type="button" className="submitButton" onClick={handleSubmit} disabled={buttonDisabled}>find dates</button>
      </div>
    </div>
  );
}

export default Form;
