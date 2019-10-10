/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
import React from 'react';
import './List.scss';

function List(props) {
  const { results } = props;

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
                  {results[i].rating} stars
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

  return (
    <div className="cardsContainer">
      {getCards()}
    </div>
  );
}

export default List;
