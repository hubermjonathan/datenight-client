import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DatePlanDetail from './DatePlanDetail';

Enzyme.configure({ adapter: new Adapter() });

describe('<DatePlanDetail />', () => {
  const wrapper = Enzyme.shallow(<DatePlanDetail match={{ params: { id: '1' } }} />);

  it('renders the dateplan title', () => {
    expect(wrapper.find('.detailTitle')).toHaveLength(1);
    // expect dateplan title to be correct
  });

  it('renders the dateplan rating', () => {
    expect(wrapper.find('.detailRating')).toHaveLength(1);
    // expect dateplan rating to be correct
  });

  it('renders the dateplan item cards', () => {
    // expect(wrapper.find('.detailCard')).toHaveLength(10);
  });

  it('renders one of the cards correctly', () => {
    // isolate one of the cards
    // check the title
    // check the rating
    // check the address
    // check the phone
    // check the website
  });
});
