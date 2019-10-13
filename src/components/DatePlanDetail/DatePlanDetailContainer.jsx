import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DatePlanDetail from './DatePlanDetail';

function DatePlanDetailContainer(props) {
  const { match } = props;
  const { params } = match;
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [rating, setRating] = useState(null);
  const [items, setItems] = useState([]);

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

  return (
    <DatePlanDetail loading={loading} name={name} rating={rating} items={items} />
  );
}

DatePlanDetailContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default DatePlanDetailContainer;
