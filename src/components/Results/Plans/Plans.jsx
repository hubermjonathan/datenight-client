/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import './Plans.scss';

function Plans(props) {
  const { results } = props;

  function getPlans() {
    const userCards = [];
    if (!results) return userCards;
    if (userCards.length === 0) {
      return <div className="emptyMessage">You have no saved date plans.</div>;
    }
    return userCards;
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
