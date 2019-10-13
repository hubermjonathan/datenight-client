/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import PropTypes from 'prop-types';
import './DatePlanDetail.scss';
import Nav from '../../common/Nav/Nav';

function DatePlanDetail(props) {
  const {
    loading,
    name,
    rating,
    items,
  } = props;

  function createDateplanCards() {
    return items.map((item) => (
      <div className="detailCard" key={item.placeid}>
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

DatePlanDetail.defaultProps = {
  rating: null,
};

DatePlanDetail.propTypes = {
  loading: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  rating: PropTypes.number,
  items: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    long: PropTypes.number.isRequired,
    lat: PropTypes.number.isRequired,
    address: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    website: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    placeid: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
  })).isRequired,
};

export default DatePlanDetail;
