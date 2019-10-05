/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './DatePlanDetail.scss';
import Nav from '../../common/Nav/Nav';

function DatePlanDetail(props) {
  const dateplanData = [
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
  const [rating, setRating] = useState(0);

  useEffect(() => {
    console.log(params.id);
    setItems(dateplanData);
    setName('Test Date Plan');
    setRating(3);
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
        {item.rating && <div className="detailCardPhone">{item.phone}</div>}
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
        <div className="detailRating">{rating} stars</div>
        {createDateplanCards()}
      </div>
    </div>
  );
}

DatePlanDetail.propTypes = {
  match: PropTypes.objectOf({
    params: PropTypes.objectOf({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default DatePlanDetail;
