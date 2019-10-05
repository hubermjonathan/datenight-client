/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import './Results.scss';
import NavWithTabs from '../../common/NavWithTabs/NavWithTabs';
import Map from './Map/Map';
import List from './List/List';

function Results(props) {
  const { location } = props;
  const { results, center } = location.state;
  const [currentPage, setCurrentPage] = useState('map');

  function getPage() {
    if (currentPage === 'map') {
      return <Map pins={results} center={center} />;
    }

    return <List results={results} />;
  }

  function changeToMap() {
    setCurrentPage('map');
  }

  function changeToList() {
    setCurrentPage('list');
  }

  return (
    <div className="results">
      <NavWithTabs currentPage={currentPage} onClickMap={changeToMap} onClickList={changeToList} />

      {getPage()}
    </div>
  );
}

export default Results;
