import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Map from './Map';

Enzyme.configure({ adapter: new Adapter() });

describe('<Map />', () => {
  const pins = {
    state: {
      pins: [
        {
          location: {
            lat: 37.250204,
            lng: -121.844305,
          },
          name: 'Happy Lemon',
          phone: '(408) 622-6785',
          website: 'postmates.com',
          hours: 'open until 10pm today',
        },
        {
          location: {
            lat: 37.321751,
            lng: -121.971519,
          },
          name: '7 Leaves',
          phone: '(408) 618-8401',
          website: 'no website',
          hours: 'open until 11pm today',
        },
        {
          location: {
            lat: 37.420849,
            lng: -121.916505,
          },
          name: 'Fantasia',
          phone: '(408) 260-1668',
          website: 'doordash.com',
          hours: 'open until 10pm today',
        },
      ],
    },
  };
  const wrapper = Enzyme.shallow(<Map location={pins} />);

  it('renders the map container', () => {
    expect(wrapper.find('.mapContainer')).toHaveLength(1);
  });

  it.skip('renders the pins', () => {
    expect(wrapper.find('img')).toHaveLength(pins.length);
  });
});
