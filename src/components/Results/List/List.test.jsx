import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import List from './List';
import { useAuth0 } from '../../../common/authHook';

Enzyme.configure({ adapter: new Adapter() });
jest.mock('../../../common/authHook');
const loginSpy = sinon.spy();
const logoutSpy = sinon.spy();
const getTokenSilentlySpy = sinon.spy();

describe('<List />', () => {
  const results = [
    {
      location: {
        lat: 37.250204,
        lng: -121.844305,
      },
      name: 'Happy Lemon',
      website: 'postmates.com',
      rating: '4.4',
      priceLevel: 2,
      openHours: [
        'Monday: HOURS',
        'Tuesday: HOURS',
        'Wednesday: HOURS',
        'Thursday: HOURS',
        'Friday: HOURS',
        'Saturday: HOURS',
        'Sunday: HOURS',
      ],
    },
    {
      location: {
        lat: 37.321751,
        lng: -121.971519,
      },
      name: '7 Leaves',
      phone: '(408) 618-8401',
      rating: '4.4',
    },
    {
      location: {
        lat: 37.420849,
        lng: -121.916505,
      },
      name: 'Fantasia',
      phone: '(408) 260-1668',
      website: 'doordash.com',
      address: '123 happy st',
    },
  ];

  beforeEach(() => {
    useAuth0.mockReturnValue({
      isAuthenticated: false,
      user: {
        email: 'hubermjonathan@gmail.com',
        email_verified: true,
      },
      logout: logoutSpy,
      loginWithRedirect: loginSpy,
      getTokenSilently: getTokenSilentlySpy,
    });
  });


  it('renders the cards container', () => {
    const wrapper = Enzyme.mount(<List results={results} />);
    expect(wrapper.find('.cardsContainer')).toHaveLength(1);
  });

  it('renders the cards', () => {
    const wrapper = Enzyme.mount(<List results={results} />);
    expect(wrapper.find('.listCard')).toHaveLength(results.length);
  });

  it('renders message when no cards exist', () => {
    const emptyWrapper = Enzyme.mount(<List results={[]} />);
    expect(emptyWrapper.find('.listCard')).toHaveLength(0);
    expect(emptyWrapper.find('.emptyMessage').text()).toMatch('your search returned no results.');
  });

  it('renders the card titles', () => {
    const wrapper = Enzyme.mount(<List results={results} />);
    expect(wrapper.find('.listCardTitle')).toHaveLength(results.length);
  });

  it('renders the card ratings', () => {
    const wrapper = Enzyme.mount(<List results={results} />);
    expect(wrapper.find('.listCardRating')).toHaveLength(results.length - 1);
  });

  it('renders the card phone numbers', () => {
    const wrapper = Enzyme.mount(<List results={results} />);
    expect(wrapper.find('.listCardPhone')).toHaveLength(results.length - 1);
  });

  it('renders the card websites', () => {
    const wrapper = Enzyme.mount(<List results={results} />);
    expect(wrapper.find('.listCardWebsite')).toHaveLength(results.length);
  });

  it('renders a message for no website', () => {
    const wrapper = Enzyme.mount(<List results={results} />);
    expect(wrapper.find('.listCardWebsite').at(1).text()).toMatch('no website');
  });

  it('renders the card price levels', () => {
    const wrapper = Enzyme.mount(<List results={results} />);
    expect(wrapper.find('.listCardTitle').at(0).text()).toContain('$$');
  });

  it('renders the card hours', () => {
    const wrapper = Enzyme.mount(<List results={results} />);
    expect(wrapper.find('.listCardHours')).toHaveLength(results.length);
    expect(wrapper.find('.listCardHours').at(0).text()).toContain('Today: HOURS');
  });

  it('renders a message for no hours', () => {
    const wrapper = Enzyme.mount(<List results={results} />);
    expect(wrapper.find('.listCardHours').at(1).text()).toContain('\n Hours not available \n');
  });
});
