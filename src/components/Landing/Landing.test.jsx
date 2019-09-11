import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Landing from './Landing';

Enzyme.configure({ adapter: new Adapter() });

describe('<Landing />', () => {
  it('renders the page title', () => {
    const wrapper = Enzyme.shallow(<Landing />);
    expect(wrapper.find('.title').length).toBe(1);
  });

  it('renders the description', () => {
    const wrapper = Enzyme.shallow(<Landing />);
    expect(wrapper.find('.description').length).toBe(1);
  });

  it('renders the continue button', () => {
    const wrapper = Enzyme.shallow(<Landing />);
    expect(wrapper.find('.button').length).toBe(1);
  });
});
