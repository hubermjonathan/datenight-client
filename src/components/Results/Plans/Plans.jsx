/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Plans.scss';

function Plans() {
  const [plans, setPlans] = useState();

  async function handleRate(event, id) {
    fetch('https://datenight-api-251515.appspot.com/rate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ dateid: id, rating: event.target.value }),
    });
  }

  async function handleDelete(event, id) {
    fetch('https://datenight-api-251515.appspot.com/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ dateid: id }),
    });
  }

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    const mock = [{
      date: 'cool date',
      user: '1234',
      id: 'abc',
      rating: '3',
    },
    {
      date: 'cool date 2',
      user: '1235',
      id: 'abd',
      rating: '5',
    },
    {
      date: 'cool date 3',
      user: '1236',
      id: 'abz',
      rating: '2',
    },
    ];
    for (let i = 0; i < 25; i += 1) {
      mock.push(
        {
          date: 'cool date ',
          user: '1236',
          id: 'abz',
          rating: `${(i % 4) + 1}`,
        },
      );
    }

    const plansCards = [];
    for (let i = 0; i < mock.length; i += 1) {
      plansCards.push(
        <div className="listCard" key={`listCard${i}`}>
          <div className="cardTitle">
            {mock[i].date}
            &nbsp;
          </div>
          <div className="cardRating">
            Rating: &nbsp;
            <button className="button" type="button" disabled>
              <select className="selectRate" onChange={(e) => handleRate(e, mock[i].id)}>
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
            <button className="cardDeleteBtn" type="button" onClick={(e) => handleDelete(e, mock[i].id)}>
              Delete
            </button>
          </a>
        </div>,
      );
    }
    if (plansCards.length === 0) {
      return <div className="emptyMessage">You have no saved date plansCards.</div>;
    }

    setPlans(plansCards);
  }, []);

  return (
    <div>
      <div className="planContainer">
        {plans}
      </div>
    </div>
  );
}

export default Plans;
