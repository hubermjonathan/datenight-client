/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import './Map.scss';

function Map(props) {
  const { pins, center } = props;

  useEffect(() => {
    const map = new window.google.maps.Map(document.getElementById('mapContainer'), {
      center,
      zoom: 1,
      // zoom: 12,
      disableDefaultUI: true,
    });

    const addLocationControl = document.createElement('div');
    addLocationControl.style.cursor = 'pointer';
    addLocationControl.style.backgroundColor = '#ffffff';
    addLocationControl.style.margin = '2rem';
    addLocationControl.style.color = '#006494';
    addLocationControl.style.fontSize = '1.5rem';
    addLocationControl.style.textAlign = 'center';
    addLocationControl.style.boxShadow = '0px 5px 5px 0px rgba(0, 0, 0, 0.16)';
    addLocationControl.style.borderRadius = '15px';
    addLocationControl.style.padding = '1rem';
    addLocationControl.title = 'add a location to the map';
    addLocationControl.innerHTML = 'add a location to the map';
    addLocationControl.addEventListener('click', () => {
      addLocationControl.style.opacity = '0.7';
      addLocationControl.style.cursor = 'default';

      const listener = map.addListener('click', (e) => {
        if (e.placeId) {
          e.stop();

          if (confirm('Are you sure you want to add this place?')) {
            const newLocation = {
              placeid: e.placeId,
            };

            fetch('https://datenight-api-251515.appspot.com/createVenue', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(newLocation),
            });

            addLocationControl.style.opacity = '1';
            addLocationControl.style.cursor = 'pointer';
            window.google.maps.event.removeListener(listener);
          }
        }
      });
    });
    map.controls[window.google.maps.ControlPosition.RIGHT_TOP].push(addLocationControl);

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

      let popupContentString = '<div class="popup">';
      // if (pins[i].name) {
      //   popupContentString += `<div class="title">${pins[i].name}</div>`;
      // }
      if (pins[i].rating) {
        popupContentString += `<div>${pins[i].rating} stars</div>`;
      }
      if (pins[i].address) {
        popupContentString += `<div>${pins[i].address}</div>`;
      }
      if (pins[i].phone) {
        popupContentString += `<div>${pins[i].phone}</div>`;
      }
      if (pins[i].website) {
        popupContentString += `<a href="${pins[i].website}">visit their website</a>`;
      }
      if (pins[i].movieTimes) {
        popupContentString += '<div></br>movies showing:</div>';

        const movies = Object.keys(pins[i].movieTimes);
        const times = [];
        for (let j = 0; j < movies.length; j += 1) {
          const timesForJ = Object.values(pins[i].movieTimes)[j];
          const timesForJDecoded = timesForJ.map((time) => {
            const date = new Date(time);
            const hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
            const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
            const ampm = date.getHours() > 12 ? 'pm' : 'am';
            return `${hours}:${minutes}${ampm}`;
          });
          times.push(timesForJDecoded.join(', '));
        }

        for (let j = 0; j < movies.length; j += 1) {
          popupContentString += `<div>${movies[j]}: ${times[j]}</div>`;
        }
      }
      popupContentString += '</div>';

      const popup = new window.google.maps.InfoWindow({
        content: popupContentString,
      });

      marker.addListener('click', () => {
        popup.open(map, marker);
      });
    }
  });

  return (
    <div className="mapContainer" id="mapContainer" />
  );
}

export default Map;
