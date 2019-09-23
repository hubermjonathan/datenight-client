import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import './Form.scss';

function Form() {
  const [location, setLocation] = useState({});
  const [priceRange, setPriceRange] = useState(1);
  const [type, setType] = useState([]);
  const [minTime, setMinTime] = useState('');
  const [maxTime, setMaxTime] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [pins, setPins] = useState([]);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (document.getElementById('locationInput') === null) {
      return;
    }

    const auto = new window.google.maps.places.Autocomplete(document.getElementById('locationInput'));

    auto.addListener('place_changed', () => {
      const place = auto.getPlace();

      if (!place.geometry) {
        setButtonDisabled(true);
        return;
      }

      const autoLocation = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };

      setLocation(autoLocation);
      if (type.length > 0) setButtonDisabled(false);
    });
  });

  function onChangePriceRange(event) {
    setPriceRange(event.target.value);
  }

  function onChangeType(event) {
    if (type.includes(event.target.value)) {
      const tempTypes = type.slice();
      tempTypes.splice(tempTypes.indexOf(event.target.value), 1);

      setType([...tempTypes]);

      if (location.lat && type.length - 1 > 0) {
        setButtonDisabled(false);
      } else {
        setButtonDisabled(true);
      }
    } else {
      setType([...type, event.target.value]);

      if (location.lat) setButtonDisabled(false);
    }
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
      coordinates: [location.lat, location.lng],
      priceLevel: +priceRange,
      dateTypes: type,
      minTime,
      maxTime,
    };

    fetch('https://datenight-api-251515.appspot.com/getVenues', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((json) => {
        setPins([...pins, ...json]);
        setRedirect(true);
      });
  }

  if (redirect) {
    return (
      <Redirect to={{
        pathname: '/results',
        state: { results: pins, center: location },
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
          <input className="form-control" id="locationInput" placeholder="enter a location" />
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
          <select multiple className="form-control" onChange={onChangeType} value={type}>
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
