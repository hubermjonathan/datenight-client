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

  it('renders the navbar', () => {
    expect(wrapper.find('.nav')).toHaveLength(1);
  });

  it('renders the logo', () => {
    expect(wrapper.find('.logo')).toHaveLength(1);
  });

  it('renders the tab menu', () => {
    expect(wrapper.find('.tabs')).toHaveLength(1);
  });

  it('renders the account icon', () => {
    expect(wrapper.find('.account')).toHaveLength(1);
  });

  it('renders the map container', () => {
    expect(wrapper.find('.mapContainer')).toHaveLength(1);
  });

  it('renders the pins', () => {
    expect(wrapper.find('.pin')).toHaveLength(pins.length);
  });
});
