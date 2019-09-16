import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import RouterButton from './RouterButton';

Enzyme.configure({ adapter: new Adapter() });

describe('<RouterButton />', () => {
  it('renders the button', () => {
    const wrapper = Enzyme.shallow(<RouterButton linkTo="/" />);
    expect(wrapper.find('.routerButton').length).toBe(1);
  });

  it('disables the button when passed a disabled prop', () => {
    const wrapper = Enzyme.shallow(<RouterButton linkTo="/" disabled />);

    expect(wrapper.find('.routerButtonDisabled').length).toBe(1);
    expect(wrapper.find('.routerButton').length).toBe(0);
  });
});
