import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Landing from './Landing';

Enzyme.configure({ adapter: new Adapter() });

describe('<Landing />', () => {
  const wrapper = Enzyme.shallow(<Landing />);

  it('renders the page title', () => {
    expect(wrapper.find('.title')).toHaveLength(1);
    expect(wrapper.find('.title').text()).toMatch('DateNight');
  });

  it('renders the description', () => {
    expect(wrapper.find('.description')).toHaveLength(1);
    expect(wrapper.find('.description').text()).toMatch('date ideas simplified');
  });
});
