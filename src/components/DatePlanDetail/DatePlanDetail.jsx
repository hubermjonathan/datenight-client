/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from 'react';
import './DatePlanDetail.scss';
import Nav from '../../common/Nav/Nav';

function DatePlanDetail() {
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
  const [dateplan] = useState(dateplanData);

  function createDateplanCards() {
    return dateplan.map((item) => (
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
        {createDateplanCards()}
      </div>
    </div>
  );
}

export default DatePlanDetail;
