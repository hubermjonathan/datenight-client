/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Plans.scss';

function Plans(props) {
  const { results } = props;

  async function handleRate(event, id) {
    fetch('https://datenight-api-251515.appspot.com/rate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ dateid: id, rating: event.target.value }),
    });
  }

  async function handleDelete(id) {
    fetch('https://datenight-api-251515.appspot.com/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ dateid: id }),
    });
  }


  function getPlans() {
    const plans = [];
    if (!results) return plans;
    const mock = [{
      date: 'Cool date',
      user: '1234',
      id: 'abc',
      rating: '3',
    },
    {
      date: 'Cool date 2',
      user: '1235',
      id: 'abd',
      rating: '5',
    },
    {
      date: 'Cool date 3',
      user: '1236',
      id: 'abz',
      rating: '2',
    },
    ];
    for (let i = 0; i < 25; i += 1) {
      mock.push(
        {
          date: 'Cool date ',
          user: '1236',
          id: 'abz',
          rating: `${(i % 4) + 1}`,
        },
      );
    }
    for (let i = 0; i < mock.length; i += 1) {
      plans.push(
        <div className="listCard" key={`listCard${i}`}>
          <div className="cardTitle">
            {mock[i].date}
            &nbsp;
          </div>
          <div className="cardRating">
            Rating: {' '}
            <button className="button" type="button" disabled>
              <select className="selectRate" onChange={handleRate.bind(mock[i].id)}>
                <option value={`${mock[i].rating} stars`} selected disabled hidden>{`${mock[i].rating} stars`}</option>
                <option value="1">1 stars</option>
                <option value="2">2 stars</option>
                <option value="3">3 stars</option>
                <option value="4">4 stars</option>
                <option value="5">5 stars</option>
              </select>
            </button>
          </div>
          <Link className="cardViewBtn" to={`/plan/${mock[i].id}`}>
            <button className="cardViewBtn" type="button">
              Details
            </button>
          </Link>
          <a className="cardDeleteBtn" href>
            <button className="cardDeleteBtn" type="button" onClick={handleDelete}>
              Delete
            </button>
          </a>
        </div>,
      );
    }
    if (plans.length === 0) {
      return <div className="emptyMessage">You have no saved date plans.</div>;
    }
    return plans;
  }


  const [plans] = useState(getPlans());

  return (
    <div>
      <div className="planContainer">
        {plans}
      </div>
    </div>
  );
}

export default Plans;
