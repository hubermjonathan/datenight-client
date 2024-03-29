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
      rating: '3',
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
      isAuthenticated: true,
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

  it('renders card without a price level', () => {
    const wrapper = Enzyme.mount(<List results={results} />);
    expect(wrapper.find('.listCardTitle').at(1).text()).not.toContain('$');
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

  it('renders start dateplan btn', () => {
    const wrapper = Enzyme.mount(<List results={results} />);
    expect(wrapper.find('.utilityBar').at(0).text().includes('Start Dateplan')).toBe(true);
  });

  it('renders view dateplan btn', () => {
    const wrapper = Enzyme.mount(<List results={results} />);
    expect(wrapper.find('.utilityBar').at(0).text().includes('View Dateplan')).toBe(true);
  });

  it('renders add btn on card(s)', () => {
    const wrapper = Enzyme.mount(<List results={results} />);
    expect(wrapper.find('.listCard').at(0).text().includes('Add')).toBe(true);
  });

  it('clicks add btn', () => {
    const wrapper = Enzyme.mount(<List results={results} />);
    expect(wrapper.find('.btn-primary').at(1).simulate('click')).toHaveLength(1);
  });

  it('clicks start plans btn', () => {
    const wrapper = Enzyme.mount(<List results={results} />);
    expect(wrapper.find('button').at(0).simulate('click')).toHaveLength(1);
  });

  it('disables view plans btn if no dateplan name exists', () => {
    const wrapper = Enzyme.mount(<List results={results} />);
    expect(wrapper.find('button').at(1).prop('disabled')).toBe(true);
  });

  it('enables view plans btn if dateplan name exists', () => {
    const wrapper = Enzyme.mount(<List results={results} />);
    wrapper.find('button').at(0).simulate('click');
    wrapper.find('input').at(0).simulate('change', { target: { value: 'dateplan1' } });
    wrapper.find('Button').at(0).simulate('click');
    expect(wrapper.find('button').at(1).prop('disabled')).toBe(false);
  });

  it('displays the activities if one was added', () => {
    const wrapper = Enzyme.mount(<List results={results} />);
    wrapper.find('button').at(0).simulate('click');
    wrapper.find('input').at(0).simulate('change', { target: { value: 'dateplan1' } });
    wrapper.find('Button').at(0).simulate('click');

    wrapper.find('.listCard').at(0).find('button').at(0)
      .simulate('click');
    wrapper.find('Button').at(2).simulate('click');

    wrapper.find('button').at(1).simulate('click');
    expect(wrapper.find('li')).toHaveLength(1);
  });

  it('displays nothing if no activity was added', () => {
    const wrapper = Enzyme.mount(<List results={results} />);
    wrapper.find('button').at(0).simulate('click');
    wrapper.find('input').at(0).simulate('change', { target: { value: 'dateplan1' } });
    wrapper.find('Button').at(0).simulate('click');
    wrapper.find('button').at(1).simulate('click');
    expect(wrapper.find('li')).toHaveLength(0);
  });

  it('renders save dateplan btn', () => {
    const wrapper = Enzyme.mount(<List results={results} />);
    wrapper.find('button').at(0).simulate('click');
    wrapper.find('input').at(0).simulate('change', { target: { value: 'dateplan1' } });
    wrapper.find('Button').at(0).simulate('click');
    wrapper.find('button').at(1).simulate('click');
    expect(wrapper.find('Button').at(2)).toHaveLength(1);
  });

  it('check sort render', () => {
    const wrapper = Enzyme.mount(<List results={results} />);
    expect(wrapper.find('select.sort')).toHaveLength(1);
  });

  it('check sorting option render', () => {
    const wrapper = Enzyme.mount(<List results={results} />);
    wrapper.find('.sort').simulate('click');
    expect(wrapper.find('option')).toHaveLength(3);
  });

  it('check sorting price', () => {
    const wrapper = Enzyme.mount(<List results={results} />);
    wrapper.find('.sort').simulate('change', { target: { value: 'price' } });
    expect(wrapper.find('.listCard').at(0).html()).toMatch('$$');
  });

  it('check sorting rating', () => {
    const wrapper = Enzyme.mount(<List results={results} />);
    wrapper.find('.sort').simulate('change', { target: { value: 'rating' } });
    expect(wrapper.find('.listCard').at(0).html()).toMatch('4.4');
  });
});
