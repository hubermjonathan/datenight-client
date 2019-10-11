/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import './List.scss';

function List(props) {
  const { results } = props;
  const [sortChange, setSortChange] = useState('');

  function getCards() {
    const createdCards = [];
    if (results) {
      for (let i = 0; i < results.length; i += 1) {
        createdCards.push(
          <div className="listCard" key={`listCard${i}`}>
            <div className="listCardTitle">{results[i].name}</div>
            {results[i].rating
              && (
                <div className="listCardRating">
                  {results[i].rating}
                  {' '}
                  stars
                </div>
              )}
            <div className="listCardAddress">{results[i].address}</div>
            {results[i].rating && <div className="listCardPhone">{results[i].phone}</div>}
            {results[i].website && <a className="listCardWebsite" href={results[i].website}>visit their website</a>}
            {results[i].website === undefined && <div className="listCardWebsite">no website</div>}
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
    console.log('lmao');
    setSortChange(event.target.value);
    const newCards = cards.slice(0);
    if (sortChange === 'rating') {
      console.log(newCards);
      // newCards.sort((e1, e2) => {
      //   if (e1.) {
      //     return -1;
      //   }
      //   if () {
      //     return 1;
      //   }
      //   return 0;
      // });
    }
    if (sortChange === 'price') { newCards.sort(); }
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
