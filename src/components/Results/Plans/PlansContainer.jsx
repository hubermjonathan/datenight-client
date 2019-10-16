import React, { useState, useEffect } from 'react';
import Plans from './Plans';
import { useAuth0 } from '../../../common/authHook';

function PlansContainer() {
  const { getTokenSilently } = useAuth0();

  const [loading, setLoading] = useState(true);
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    async function getData() {
      const token = await getTokenSilently();
      fetch('https://datenight-api-251515.appspot.com/plans', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        // eslint-disable-next-line consistent-return
        .then((json) => {
          setPlans(json.plans);
          setLoading(false);
        });
    }

    getData();
  }, []);

  async function handleRate(event, id) {
    const token = await getTokenSilently();
    const body = {
      dateid: id,
      rating: +event,
    };
    fetch('https://datenight-api-251515.appspot.com/rate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
  }

  async function handleDelete(event, id) {
    const token = await getTokenSilently();
    const body = {
      dateid: id,
    };
    fetch('https://datenight-api-251515.appspot.com/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
  }

  return (
    <Plans loading={loading} plans={plans} handleRate={handleRate} handleDelete={handleDelete} />
  );
}

PlansContainer.propTypes = {
};

export default PlansContainer;
