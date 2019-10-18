import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { StaticRouter } from 'react-router-dom';
import sinon from 'sinon';
import Plans from './Plans';
import { useAuth0 } from '../../../common/authHook';

Enzyme.configure({ adapter: new Adapter() });
jest.mock('../../../common/authHook');
const loginSpy = sinon.spy();
const logoutSpy = sinon.spy();
const getTokenSilentlySpy = sinon.spy();

describe('<Plans />', () => {
  const plans = [
    {
      date: '--DATE PLAN 1--',
      daterating: 4,
      user: '--USER--',
      dateid: '--DATE PLAN 1--',
    },
    {
      date: '',
      daterating: 3,
      user: '--USER--',
      dateid: '--DATE PLAN 2--',
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
    const wrapper = Enzyme.mount(
      <StaticRouter basename="/results">
        <Plans loading={false} plans={plans} handleShare={jest.fn()} handleDelete={jest.fn()} />
      </StaticRouter>,
    );
    expect(wrapper.find('.planContainer')).toHaveLength(1);
  });

  it('renders the cards', () => {
    const wrapper = Enzyme.mount(
      <StaticRouter basename="/results">
        <Plans loading={false} plans={plans} handleShare={jest.fn()} handleDelete={jest.fn()} />
      </StaticRouter>,
    );
    expect(wrapper.find('.plansCard')).toHaveLength(plans.length);
  });

  it('renders message when no cards exist', () => {
    const emptyWrapper = Enzyme.mount(
      <StaticRouter basename="/results">
        <Plans loading={false} plans={[]} handleShare={jest.fn()} handleDelete={jest.fn()} />
      </StaticRouter>,
    );
    expect(emptyWrapper.find('.listCard')).toHaveLength(0);
    expect(emptyWrapper.find('.emptyMessage').text()).toMatch('You have no saved date plans.');
  });

  it('renders the title for each card', () => {
    const wrapper = Enzyme.mount(
      <StaticRouter basename="/results">
        <Plans loading={false} plans={plans} handleShare={jest.fn()} handleDelete={jest.fn()} />
      </StaticRouter>,
    );
    expect(wrapper.find('.cardTitle')).toHaveLength(2);
  });

  it('renders the rating for each card', () => {
    const wrapper = Enzyme.mount(
      <StaticRouter basename="/results">
        <Plans loading={false} plans={plans} handleShare={jest.fn()} handleDelete={jest.fn()} />
      </StaticRouter>,
    );
    expect(wrapper.find('.cardRating')).toHaveLength(2);
  });

  it('renders options for rating', () => {
    const wrapper = Enzyme.mount(
      <StaticRouter basename="/results">
        <Plans loading={false} plans={plans} handleShare={jest.fn()} handleDelete={jest.fn()} />
      </StaticRouter>,
    );
    expect(wrapper.find('option')).toHaveLength(12);
  });

  it('check for api call on rating selection', () => {
    const ratingFn = jest.fn();
    const wrapper = Enzyme.mount(
      <StaticRouter basename="/results">
        <Plans
          loading={false}
          plans={[
            {
              date: '--DATE PLAN 1--',
              daterating: 4,
              user: '--USER--',
              dateid: '--DATE PLAN 1--',
            },
          ]}
          handleRate={ratingFn}
          handleShare={jest.fn()}
          handleDelete={jest.fn()}
        />
      </StaticRouter>,
    );
    wrapper.find('.selectRate').simulate('change', { target: { value: '2' } });
    expect(ratingFn).toHaveBeenCalledWith('2', '--DATE PLAN 1--');
  });

  it('renders the details button for each card', () => {
    const wrapper = Enzyme.mount(
      <StaticRouter basename="/results">
        <Plans loading={false} plans={plans} handleShare={jest.fn()} handleDelete={jest.fn()} />
      </StaticRouter>,
    );
    expect(wrapper.find('button.cardViewBtn')).toHaveLength(2);
  });

  it('renders the delete button for each card', () => {
    const wrapper = Enzyme.mount(
      <StaticRouter basename="/results">
        <Plans loading={false} plans={plans} handleShare={jest.fn()} handleDelete={jest.fn()} />
      </StaticRouter>,
    );
    expect(wrapper.find('button.cardDeleteBtn')).toHaveLength(2);
  });

  it('check for api call on delete button click', () => {
    const deleteFn = jest.fn();
    const wrapper = Enzyme.mount(
      <StaticRouter basename="/results">
        <Plans
          loading={false}
          plans={[
            {
              date: '--DATE PLAN 1--',
              daterating: 4,
              user: '--USER--',
              dateid: '--DATE PLAN 1--',
            },
          ]}
          handleRate={jest.fn()}
          handleShare={jest.fn()}
          handleDelete={deleteFn}
        />
      </StaticRouter>,
    );
    wrapper.find('button.cardDeleteBtn').simulate('click');
    expect(deleteFn).toHaveBeenCalled();
  });

  it('renders the share buttons for each card', () => {
    const wrapper = Enzyme.mount(
      <StaticRouter basename="/results">
        <Plans loading={false} plans={plans} handleShare={jest.fn()} handleDelete={jest.fn()} />
      </StaticRouter>,
    );
    expect(wrapper.find('button.cardShareBtn')).toHaveLength(2);
  });
});
