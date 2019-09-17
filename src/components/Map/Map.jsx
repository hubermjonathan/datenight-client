/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import './Map.scss';
import Nav from '../../common/Nav/Nav';

function Map(props) {
  const { location } = props;
  const { pins } = location.state;

  useEffect(() => {
    const map = new window.google.maps.Map(document.getElementById('mapContainer'), {
      center: { lat: 37.3382, lng: -121.8863 },
      zoom: 12,
      disableDefaultUI: true,
    });

    for (let i = 0; i < pins.length; i += 1) {
      const marker = new window.google.maps.Marker({
        position: pins[i].location,
        map,
        icon: {
          path: 'M112 316.94v156.69l22.02 33.02c4.75 7.12 15.22 7.12 19.97 0L176 473.63V316.94c-10.39 1.92-21.06 3.06-32 3.06s-21.61-1.14-32-3.06zM144 0C64.47 0 0 64.47 0 144s64.47 144 144 144 144-64.47 144-144S223.53 0 144 0zm0 76c-37.5 0-68 30.5-68 68 0 6.62-5.38 12-12 12s-12-5.38-12-12c0-50.73 41.28-92 92-92 6.62 0 12 5.38 12 12s-5.38 12-12 12z',
          fillColor: '#1B98E0',
          fillOpacity: 1,
          anchor: new window.google.maps.Point(150, 500),
          strokeWeight: 0,
          scale: 0.07,
        },
      });

      const popup = new window.google.maps.InfoWindow({
        content: `<div class="popup"><div class="title">${pins[i].name}</div><div>${pins[i].phone}</div><div>${pins[i].website}</div><div>${pins[i].hours}</div></div>`,
      });

      marker.addListener('click', () => {
        popup.open(map, marker);
      });
    }
  });

  return (
    <div className="map">
      <Nav currentPage="map" />

      <div className="mapContainer" id="mapContainer" />
    </div>
  );
}

export default Map;
