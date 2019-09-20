/* eslint-disable react/prop-types */
import React from 'react';
import './List.scss';
import Nav from '../../common/Nav/Nav';

function List(props) {
  const { location } = props;
  const { results } = location.state;

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
            <div className="listCardPhone">{results[i].phone}</div>
            <a className="listCardWebsite" href={results[i].website}>visit their website</a>
          </div>,
        );
      }
    }
    return createdCards;
  }

  return (
    <div className="list">
      <Nav currentPage="list" />

      <div className="cardsContainer">
        {getCards()}
      </div>
    </div>
  );
}

export default List;
