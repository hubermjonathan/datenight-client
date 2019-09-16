import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Form from './Form';

Enzyme.configure({ adapter: new Adapter() });

describe('<Form />', () => {
  const wrapper = Enzyme.shallow(<Form />);

  it('renders the card and card title', () => {
    expect(wrapper.find('.card')).toHaveLength(1);
    expect(wrapper.find('.cardTitle')).toHaveLength(1);
    expect(wrapper.find('.cardTitle').text()).toMatch('tell us what you\'re looking for');
  });

  it('renders the input labels', () => {
    expect(wrapper.find('.inputLabel')).toHaveLength(7);
    expect(wrapper.find('.inputLabel').at(0).text()).toMatch('where are you?');
    expect(wrapper.find('.inputLabel').at(1).text()).toMatch('what\'s your price range?');
    expect(wrapper.find('.inputLabel').at(2).text()).toMatch('what kind of dates are you looking for?');
    expect(wrapper.find('.inputLabel').at(3).text()).toMatch('how long do you want it to be?');
  });

  it('renders the location input', () => {
    expect(wrapper.find('.locationInput')).toHaveLength(1);
  });

  it('renders the price range input', () => {
    expect(wrapper.find('.priceRangeInput')).toHaveLength(1);
  });

  it('renders the type input', () => {
    expect(wrapper.find('.typeInput')).toHaveLength(1);
  });

  it('renders the time inputs', () => {
    expect(wrapper.find('.timeInputs')).toHaveLength(1);
  });

  it('renders the submit button', () => {
    expect(wrapper.find('.submitButton')).toHaveLength(1);
  });
});
