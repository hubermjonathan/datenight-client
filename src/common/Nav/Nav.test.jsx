import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Nav from './Nav';

Enzyme.configure({ adapter: new Adapter() });

describe('<Nav />', () => {
  const wrapper = Enzyme.shallow(<Nav currentPage="map" />);

  it('renders the nav container', () => {
    expect(wrapper.find('.nav').length).toBe(1);
  });

  it('renders the map and list buttons', () => {
    expect(wrapper.find('.tab').length).toBe(2);
  });

  it('renders the account button', () => {
    expect(wrapper.find('.account').length).toBe(1);
  });

  it('renders the map tab as active', () => {
    expect(wrapper.find('.active').length).toBe(1);
    expect(wrapper.find('.active').at(0).text()).toMatch('Map');
  });

  it('renders the list tab as active', () => {
    const listWrapper = Enzyme.shallow(<Nav currentPage="list" />);
    expect(listWrapper.find('.active').length).toBe(1);
    expect(listWrapper.find('.active').at(0).text()).toMatch('List');
  });
});
