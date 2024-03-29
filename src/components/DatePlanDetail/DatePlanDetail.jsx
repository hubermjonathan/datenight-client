/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import PropTypes from 'prop-types';
import './DatePlanDetail.scss';
// import Nav from '../../common/Nav/Nav';

function DatePlanDetail(props) {
  const {
    loading,
    name,
    rating,
    items,
  } = props;

  function createDateplanCards() {
    if (items.length === 0) return [];
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
        <a className="detailCardWebsite" href={item.website}>visit their website</a>
      </div>
    ));
  }

  return (
    <div className="detail">
      <div className="nav">
        <div className="logo">
          {/* <Link to="/">DateNight</Link> */}
          DateNight
        </div>
      </div>

      {loading && <div />}
      {!loading && (
        <div className="cards">
          {name === '' && <div className="detailTitle">404: Dateplan not found</div>}
          {name !== '' && <div className="detailTitle">{name}</div>}
          {(rating !== null && rating !== -1) && <div className="detailRating">{rating} stars</div>}
          {rating === null && <div className="detailRating">not rated</div>}
          {rating === -1 && <div className="detailRating" />}
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
