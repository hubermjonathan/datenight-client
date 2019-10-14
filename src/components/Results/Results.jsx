/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import './Results.scss';
import NavWithTabs from '../../common/NavWithTabs/NavWithTabs';
import Map from './Map/Map';
import List from './List/List';
import Plans from './Plans/Plans';

function Results(props) {
  const { location } = props;
  const { results, center } = location.state;
  const [currentPage, setCurrentPage] = useState('map');

  function getPage() {
    if (currentPage === 'map') {
      return <Map pins={results} center={center} />;
    }
    if (currentPage === 'list') {
      return <List results={results} />;
    }
    return <Plans results={results} />;
  }

  function changeToMap() {
    setCurrentPage('map');
  }

  function changeToList() {
    setCurrentPage('list');
  }

  function changeToPlans() {
    setCurrentPage('plans');
  }

  return (
    <div className="results">
      <NavWithTabs
        currentPage={currentPage}
        onClickMap={changeToMap}
        onClickList={changeToList}
        onClickPlans={changeToPlans}
      />

      {getPage()}

    </div>
  );
}

export default Results;
