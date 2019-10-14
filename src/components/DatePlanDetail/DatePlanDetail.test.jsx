import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { StaticRouter } from 'react-router-dom';
import sinon from 'sinon';
import DatePlanDetail from './DatePlanDetail';
import { useAuth0 } from '../../common/authHook';

Enzyme.configure({ adapter: new Adapter() });
jest.mock('../../common/authHook');
const loginSpy = sinon.spy();
const logoutSpy = sinon.spy();

const loading = false;
const name = '--TEST PLAN--';
const rating = null;
const items = [
  {
    name: '--TEST ACTIVITY--',
    long: 0,
    lat: 0,
    address: '--TEST ADDR--',
    price: 0,
    website: 'www.google.com',
    phone: '123456789',
    placeid: '--TEST1--',
    rating: 1,
  },
  {
    name: '--TEST ACTIVITY--',
    long: 0,
    lat: 0,
    address: '--TEST ADDR--',
    price: 0,
    website: 'www.google.com',
    phone: '123456789',
    placeid: '--TEST2--',
    rating: 1,
  },
];

describe('<DatePlanDetail />', () => {
  beforeEach(() => {
    useAuth0.mockReturnValue({
      isAuthenticated: false,
      user: {
        email: 'hubermjonathan@gmail.com',
        email_verified: true,
      },
      logout: logoutSpy,
      loginWithRedirect: loginSpy,
    });
  });

  it('renders the dateplan title', () => {
    const wrapper = Enzyme.mount(
      <StaticRouter basename="/plan/04fd2d02-eddc-11e9-833f-02c9b3b50bb8">
        <DatePlanDetail loading={loading} name={name} rating={rating} items={items} />
      </StaticRouter>,
    );
    expect(wrapper.find('.detailTitle')).toHaveLength(1);
    expect(wrapper.find('.detailTitle').at(0).text()).toMatch('--TEST PLAN--');
  });

  it('renders the dateplan rating with a null rating', () => {
    const wrapper = Enzyme.mount(
      <StaticRouter basename="/plan/04fd2d02-eddc-11e9-833f-02c9b3b50bb8">
        <DatePlanDetail loading={loading} name={name} rating={rating} items={items} />
      </StaticRouter>,
    );
    expect(wrapper.find('.detailRating')).toHaveLength(1);
    expect(wrapper.find('.detailRating').at(0).text()).toMatch('not rated');
  });

  it('renders the dateplan item cards', () => {
    const wrapper = Enzyme.mount(
      <StaticRouter basename="/plan/04fd2d02-eddc-11e9-833f-02c9b3b50bb8">
        <DatePlanDetail loading={loading} name={name} rating={rating} items={items} />
      </StaticRouter>,
    );
    expect(wrapper.find('.detailCard')).toHaveLength(2);
  });

  it('renders one of the cards correctly', () => {
    const wrapper = Enzyme.mount(
      <StaticRouter basename="/plan/04fd2d02-eddc-11e9-833f-02c9b3b50bb8">
        <DatePlanDetail loading={loading} name={name} rating={rating} items={items} />
      </StaticRouter>,
    );
    expect(wrapper.find('.detailCardTitle').at(0).text()).toMatch('--TEST ACTIVITY--');
    expect(wrapper.find('.detailCardRating').at(0).text()).toMatch('1 stars');
    expect(wrapper.find('.detailCardPhone').at(0).text()).toMatch('123456789');
    expect(wrapper.find('.detailCardWebsite').at(0).text()).toMatch('visit their website');
  });
});
