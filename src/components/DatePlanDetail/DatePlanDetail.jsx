/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './DatePlanDetail.scss';
import Nav from '../../common/Nav/Nav';

function DatePlanDetail(props) {
  const { match } = props;
  const { params } = match;
  const [items, setItems] = useState();
  const [name, setName] = useState();
  const [rating, setRating] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://datenight-api-251515.appspot.com/plan/${params.id}`)
      .then((res) => res.json())
      .then((json) => {
        setName(json.date);
        setRating(json.rating);
        setItems(json.activities);
        setLoading(false);
      });
  }, []);

  function createDateplanCards() {
    return items.map((item) => (
      <div className="detailCard">
        <div className="detailCardTitle">{item.name}</div>
        {item.rating
          && (
            <div className="detailCardRating">
              {item.rating} stars
            </div>
          )}
        <div className="detailCardAddress">{item.address}</div>
        {item.phone && <div className="detailCardPhone">{item.phone}</div>}
        {item.website && <a className="detailCardWebsite" href={item.website}>visit their website</a>}
        {item.website === undefined && <div className="detailCardWebsite">no website</div>}
      </div>
    ));
  }

  return (
    <div className="detail">
      <Nav />

      {loading && <div />}
      {!loading && (
        <div className="cards">
          <div className="detailTitle">{name}</div>
          {rating !== null && <div className="detailRating">{rating} stars</div>}
          {rating === null && <div className="detailRating">not rated</div>}
          {createDateplanCards()}
        </div>
      )}
    </div>
  );
}

DatePlanDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default DatePlanDetail;
