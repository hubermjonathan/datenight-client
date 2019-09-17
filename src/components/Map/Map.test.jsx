import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Map from './Map';

Enzyme.configure({ adapter: new Adapter() });

describe('<Map />', () => {
  const pins = [
    {
      location: {
        lat: -34.397,
        lng: 150.644,
      },
    },
    {
      location: {
        lat: -34.396,
        lng: 150.645,
      },
    },
  ];
  const wrapper = Enzyme.shallow(<Map pins={pins} />);

  it('renders the map container', () => {
    expect(wrapper.find('.mapContainer')).toHaveLength(1);
  });

  it.skip('renders the pins', () => {
    expect(wrapper.find('img')).toHaveLength(pins.length);
  });
});
