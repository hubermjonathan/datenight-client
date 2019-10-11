/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './DatePlanDetail.scss';
import Nav from '../../common/Nav/Nav';

function DatePlanDetail(props) {
  const dateplanItems = [
    {
      name: 'Happy Lemon',
      address: '123 Happy St',
      phone: '(123) 456-7890',
      rating: 4.4,
      website: 'happylemon.com',
    },
    {
      name: 'Happy Lemon',
      address: '123 Happy St',
      phone: '(123) 456-7890',
      rating: 4.4,
      website: 'happylemon.com',
    },
    {
      name: 'Happy Lemon',
      address: '123 Happy St',
      phone: '(123) 456-7890',
      rating: 4.4,
      website: 'happylemon.com',
    },
    {
      name: 'Happy Lemon',
      address: '123 Happy St',
      phone: '(123) 456-7890',
      rating: 4.4,
      website: 'happylemon.com',
    },
    {
      name: 'Happy Lemon',
      address: '123 Happy St',
      phone: '(123) 456-7890',
      rating: 4.4,
      website: 'happylemon.com',
    },
    {
      name: 'Happy Lemon',
      address: '123 Happy St',
      phone: '(123) 456-7890',
      rating: 4.4,
      website: 'happylemon.com',
    },
    {
      name: 'Happy Lemon',
      address: '123 Happy St',
      phone: '(123) 456-7890',
      rating: 4.4,
      website: 'happylemon.com',
    },
    {
      name: 'Happy Lemon',
      address: '123 Happy St',
      phone: '(123) 456-7890',
      rating: 4.4,
      website: 'happylemon.com',
    },
    {
      name: 'Happy Lemon',
      address: '123 Happy St',
      phone: '(123) 456-7890',
      rating: 4.4,
      website: 'happylemon.com',
    },
    {
      name: 'Happy Lemon',
      address: '123 Happy St',
      phone: '(123) 456-7890',
      rating: 4.4,
      website: 'happylemon.com',
    },
  ];
  const { match } = props;
  const { params } = match;
  const [items, setItems] = useState([]);
  const [name, setName] = useState('Loading...');
  const [rating, setRating] = useState(null);

  function getDateplanData() {
    return {
      user: 'mock',
      date: 'Test Date Plan',
      rating: 2,
      dateid: '123',
      activities: dateplanItems,
    };
  }

  useEffect(() => {
    console.log(params.id);
    const dateplanData = getDateplanData();
    setItems(dateplanData.activities);
    setName(dateplanData.date);
    setRating(dateplanData.rating);
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

      <div className="cards">
        <div className="detailTitle">{name}</div>
        {rating !== null && <div className="detailRating">{rating} stars</div>}
        {rating === null && <div className="detailRating">not rated</div>}
        {createDateplanCards()}
      </div>
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
