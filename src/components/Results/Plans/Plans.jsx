/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import './Plans.scss';

function Plans(props) {
  const { results } = props;

  function getPlans() {
    const cards = [];
    if (!results) return cards;
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
    for (let i = 0; i < mock.length; i += 1) {
      cards.push(
        <div className="listCard" key={`listCard${i}`}>
          <div className="cardTitle">
            {mock[i].date}
            &nbsp;
          </div>
          {mock[i].rating
            && (
              <div className="cardRate">
                {mock[i].rating} stars
              </div>
            )}
          <div className="cardRating">
            Rate this plan: {' '}
            <select className="selectRate">
              <option value="" hidden> </option>
              <option value="rating">1 stars</option>
              <option value="rating">2 stars</option>
              <option value="rating">3 stars</option>
              <option value="rating">4 stars</option>
              <option value="rating">5 stars</option>
            </select>
          </div>
          <button className="cardViewBtn" type="button">
            View
          </button>
          <button className="cardDeleteBtn" type="button">
            Delete
          </button>
        </div>,
      );
    }
    if (cards.length === 0) {
      return <div className="emptyMessage">You have no saved date plans.</div>;
    }
    return cards;
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
