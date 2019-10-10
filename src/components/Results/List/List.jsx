/* eslint-disable react/prop-types */
import React from 'react';
import './List.scss';

const priceLevels = ['$', '$$', '$$$', '$$$$', '$$$$$'];

function displayHours(hours) {
  if (typeof hours === 'undefined') {
    return '\n Hours not available \n';
  }
  const date = new Date();
  const today = date.getDay() - 1;
  const h = `Today: ${hours[today].substring(hours[today].indexOf(':') + 1)}`;
  return h;
}

function List(props) {
  const { results } = props;

  function getCards() {
    const createdCards = [];
    if (results) {
      for (let i = 0; i < results.length; i += 1) {
        console.log(results);
        createdCards.push(
          <div className="listCard" key={`listCard${i}`}>
            <div className="listCardTitle">
              {results[i].name}
              &nbsp;
              (
              {priceLevels[results[i].priceLevel]}
              )
            </div>
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
            <div>{displayHours(results[i].openHours)}</div>
          </div>,
        );
      }
    }

    if (createdCards.length === 0) {
      return <div className="emptyMessage">your search returned no results.</div>;
    }

    return createdCards;
  }

  return (
    <div className="cardsContainer">
      {getCards()}
    </div>
  );
}

export default List;
