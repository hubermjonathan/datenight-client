import React, { useState, useEffect } from 'react';
import DatePlanDetail from './DatePlanDetail';

function DatePlanDetailContainer() {
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [rating, setRating] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const id = window.location.href.substring(window.location.href.indexOf('?id=') + 4);
    fetch(`https://datenight-api-251515.appspot.com/plan/${id}`)
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
};

export default DatePlanDetailContainer;
