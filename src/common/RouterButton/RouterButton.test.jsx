import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import RouterButton from './RouterButton';

Enzyme.configure({ adapter: new Adapter() });

describe('<RouterButton />', () => {
  it('renders the button', () => {
    const wrapper = Enzyme.shallow(<RouterButton linkTo="/" />);
    expect(wrapper.find('.button').length).toBe(1);
  });
});
