/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Plans.scss';
import { useAuth0 } from '../../../common/authHook';

function Plans() {
  const [plans, setPlans] = useState();
  const { getTokenSilently } = useAuth0();

  async function getToken() {
    const token = await getTokenSilently();
    return token;
  }

  async function handleRate(event, id) {
    const token = getToken();
    const body = {
      dateid: id,
      rating: +event,
    };
    fetch('https://datenight-api-251515.appspot.com/rate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
  }

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

  async function handleDelete(event, id) {
    const token = getToken();
    const body = {
      dateid: id,
    };
    fetch('https://datenight-api-251515.appspot.com/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
  }

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    async function getData() {
      const token = await getTokenSilently();
      fetch('https://datenight-api-251515.appspot.com/plans', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        // eslint-disable-next-line consistent-return
        .then((json) => {
          const plansCards = [];
          for (let i = 0; i < json.plans.length; i += 1) {
            plansCards.push(
              <div className="plansCard" key={`plansCard${i}`}>
                <div className="cardTitle">
                  {json.plans[i].date}
                  &nbsp;
                </div>
                <div className="cardRating">
                  Rating: &nbsp;
                  <button className="button" type="button" disabled>
                    <select className="selectRate" onChange={(e) => handleRate(e.target.value, json.plans[i].id)}>
                      <option value={`${json.plans[i].rating} stars`} selected disabled hidden>{`${json.plans[i].rating} stars`}</option>
                      <option value="1">1 stars</option>
                      <option value="2">2 stars</option>
                      <option value="3">3 stars</option>
                      <option value="4">4 stars</option>
                      <option value="5">5 stars</option>
                    </select>
                  </button>
                </div>
                <Link className="cardViewBtn" to={`/plan?id=${json.plans[i].id}`}>
                  <button className="cardViewBtn" type="button">
                    Details
                  </button>
                </Link>
                <a className="cardShareBtn" href>
                  <button className="cardShareBtn" type="button" onClick={(e) => handleShare(e, json.plans[i].id)}>
                    Share
                  </button>
                </a>
                <a className="cardDeleteBtn" href>
                  <button className="cardDeleteBtn" type="button" onClick={(e) => handleDelete(e, json.plans[i].id)}>
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
        });
    }

    getData();
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
