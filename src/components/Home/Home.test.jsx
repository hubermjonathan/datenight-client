import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Home from './Home';

Enzyme.configure({ adapter: new Adapter() });

describe('<Home />', () => {
  it('renders the template header', () => {
    const wrapper = Enzyme.shallow(<Home />);
    expect(wrapper.find('.header').length).toBe(1);
  });
});
