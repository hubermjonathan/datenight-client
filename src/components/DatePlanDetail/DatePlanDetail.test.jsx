import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DatePlanDetail from './DatePlanDetail';

Enzyme.configure({ adapter: new Adapter() });

describe('<DatePlanDetail />', () => {
  const wrapper = Enzyme.shallow(<DatePlanDetail />);

  it('passes', () => {
    expect(wrapper.find('.detail')).toHaveLength(1);
  });
});
