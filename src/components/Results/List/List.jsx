/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import './List.scss';

const priceLevels = ['', '$', '$$', '$$$', '$$$$'];

function List(props) {
  const { results } = props;
  const [sortChange, setSortChange] = useState('');

  function displayHours(hours) {
    if (typeof hours === 'undefined') {
      return '\n Hours not available \n';
    }
    const date = new Date();
    const today = date.getDay() - 1;
    const h = `Today: ${hours[today].substring(hours[today].indexOf(':') + 2)}`;
    return h;
  }

  function dateplanClick(e) {
    console.log(e);
  }

  function getCards() {
    const createdCards = [];
    if (results) {
      for (let i = 0; i < results.length; i += 1) {
        createdCards.push(
          <div className="listCard" key={`listCard${i}`}>
            <div className="listCardTitle">
              {results[i].name}
              &nbsp;
              {priceLevels[results[i].priceLevel]}
            </div>
            {results[i].rating
              && (
                <div className="listCardRating">
                  {results[i].rating} stars
                </div>
              )}
            <div className="listCardAddress">{results[i].address}</div>
            {results[i].rating && <div className="listCardPhone">{results[i].phone}</div>}
            {results[i].website && <a className="listCardWebsite" href={results[i].website}>visit their website</a>}
            {results[i].website === undefined && <div className="listCardWebsite">no website</div>}
            <div className="listCardHours">{displayHours(results[i].openHours)}</div>
            <button key={i} type="button" className="btn btn-primary" onClick={dateplanClick}>Add to Dateplan</button>
          </div>,
        );
      }
    }

    if (createdCards.length === 0) {
      return <div className="emptyMessage">your search returned no results.</div>;
    }

    return createdCards;
  }

  const [cards, setCards] = useState(getCards());

  function onchangeSort(event) {
    setSortChange(event.target.value);
    const newCards = cards.slice(0);
    if (sortChange === 'price') {
      newCards.sort((e1, e2) => {
        if (!e1.props.children[1] && !e2.props.children[1]) {
          return -1;
        }
        if (!e1.props.children[1]) {
          return 1;
        }
        if (!e2.props.children[1]) {
          return -1;
        }
        const r1 = e1.props.children[1].props.children[0];
        const r2 = e2.props.children[1].props.children[0];
        if (r1 > r2) {
          return -1;
        }
        if (r1 < r2) {
          return 1;
        }
        return 0;
      });
    }
    if (sortChange === 'rating') {
      newCards.sort((e1, e2) => {
        if (!e1.props.children[0].props.children[2] && !e2.props.children[0].props.children[2]) {
          return -1;
        }
        if (!e1.props.children[0].props.children[2]) {
          return 1;
        }
        if (!e2.props.children[0].props.children[2]) {
          return -1;
        }
        const r1 = e1.props.children[0].props.children[2].length;
        const r2 = e2.props.children[0].props.children[2].length;
        if (r1 > r2) {
          return -1;
        }
        if (r1 < r2) {
          return 1;
        }
        return 0;
      });
    }
    setCards(newCards);
  }

  return (
    <div>
      <div className="utilityBar">
        <button className="button" type="button" disabled>
          Sort By:
          {' '}
          <select className="sort" onChange={onchangeSort} value={sortChange}>
            <option value="" disabled hidden>Default</option>
            <option value="price">Price</option>
            <option value="rating">Rating</option>
          </select>
        </button>
      </div>

      <div className="cardsContainer">
        {cards}
      </div>
    </div>
  );
}

export default List;
