/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import './Plans.scss';

function Plans(props) {
  const {
    loading,
    plans,
    handleRate,
    handleDelete,
  } = props;

  function handleShare(event, id) {
    const el = document.createElement('textarea');
    el.value = `https://dank.dating/plan?id=${id}`;
    el.setAttribute('readonly', '');
    el.style = { position: 'absolute', left: '-1000px' };
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }

  function createCards() {
    const plansCards = [];
    for (let i = 0; i < plans.length; i += 1) {
      plansCards.push(
        <div className="plansCard" key={`plansCard${i}`}>
          <div className="cardTitle">
            {plans[i].date}
            &nbsp;
          </div>
          <div className="cardRating">
            Rating: &nbsp;
            <button className="button" type="button" disabled>
              <select className="selectRate" onChange={(e) => handleRate(e.target.value, plans[i].dateid)}>
                <option value={`${plans[i].daterating} stars`} selected disabled hidden>{`${plans[i].daterating} stars`}</option>
                <option value="1">1 stars</option>
                <option value="2">2 stars</option>
                <option value="3">3 stars</option>
                <option value="4">4 stars</option>
                <option value="5">5 stars</option>
              </select>
            </button>
          </div>
          <Link className="cardViewBtn" to={`/plan?id=${plans[i].dateid}`}>
            <button className="cardViewBtn" type="button">
              Details
            </button>
          </Link>
          <a className="cardShareBtn" href>
            <button className="cardShareBtn" type="button" onClick={(e) => handleShare(e, plans[i].dateid)}>
              Share
            </button>
          </a>
          <a className="cardDeleteBtn" href>
            <button className="cardDeleteBtn" type="button" onClick={(e) => handleDelete(e, plans[i].dateid)}>
              Delete
            </button>
          </a>
        </div>,
      );
    }
    if (plansCards.length === 0) {
      return <div className="emptyMessage">You have no saved date plansCards.</div>;
    }

    return plansCards;
  }

  return (
    <div>
      <div className="planContainer">
        {!loading && createCards()}
      </div>
    </div>
  );
}

export default Plans;
