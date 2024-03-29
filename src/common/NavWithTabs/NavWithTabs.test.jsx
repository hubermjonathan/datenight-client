import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { StaticRouter } from 'react-router-dom';
import sinon from 'sinon';
import NavWithTabs from './NavWithTabs';
import { useAuth0 } from '../authHook';

Enzyme.configure({ adapter: new Adapter() });
jest.mock('../authHook');
const loginSpy = sinon.spy();
const logoutSpy = sinon.spy();

describe('<NavWithTabs />', () => {
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

  it('renders the nav container', () => {
    const wrapper = Enzyme.mount(
      <StaticRouter basename="/results">
        <NavWithTabs currentPage="map" onClickMap={jest.fn()} onClickList={jest.fn()} onClickPlans={jest.fn()} />
      </StaticRouter>,
    );
    expect(wrapper.find('.navWithTabs').length).toBe(1);
  });

  it('renders the map and list buttons', () => {
    const wrapper = Enzyme.mount(
      <StaticRouter basename="/results">
        <NavWithTabs currentPage="map" onClickMap={jest.fn()} onClickList={jest.fn()} onClickPlans={jest.fn()} />
      </StaticRouter>,
    );
    expect(wrapper.find('.tab').length).toBe(2);
  });

  it('renders the map, list, and plans buttons if logged in', () => {
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      user: {
        email: 'hubermjonathan@gmail.com',
        email_verified: true,
      },
      logout: logoutSpy,
      loginWithRedirect: loginSpy,
    });
    const wrapper = Enzyme.mount(
      <StaticRouter basename="/results">
        <NavWithTabs currentPage="map" onClickMap={jest.fn()} onClickList={jest.fn()} onClickPlans={jest.fn()} />
      </StaticRouter>,
    );
    expect(wrapper.find('.tab').length).toBe(3);
  });

  it('renders the account button', () => {
    const wrapper = Enzyme.mount(
      <StaticRouter basename="/results">
        <NavWithTabs currentPage="map" onClickMap={jest.fn()} onClickList={jest.fn()} onClickPlans={jest.fn()} />
      </StaticRouter>,
    );
    expect(wrapper.find('.account').length).toBe(1);
  });

  it('renders the map tab as active', () => {
    const wrapper = Enzyme.mount(
      <StaticRouter basename="/results">
        <NavWithTabs currentPage="map" onClickMap={jest.fn()} onClickList={jest.fn()} onClickPlans={jest.fn()} />
      </StaticRouter>,
    );
    expect(wrapper.find('.active').length).toBe(1);
    expect(wrapper.find('.active').at(0).text()).toMatch('Map');
  });

  it('renders the list tab as active', () => {
    const wrapper = Enzyme.mount(
      <StaticRouter basename="/results">
        <NavWithTabs currentPage="list" onClickMap={jest.fn()} onClickList={jest.fn()} onClickPlans={jest.fn()} />
      </StaticRouter>,
    );
    expect(wrapper.find('.active').length).toBe(1);
    expect(wrapper.find('.active').at(0).text()).toMatch('List');
  });

  it('renders the plans tab as active', () => {
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      user: {
        email: 'hubermjonathan@gmail.com',
        email_verified: true,
      },
      logout: logoutSpy,
      loginWithRedirect: loginSpy,
    });
    const wrapper = Enzyme.mount(
      <StaticRouter basename="/results">
        <NavWithTabs currentPage="plans" onClickMap={jest.fn()} onClickList={jest.fn()} onClickPlans={jest.fn()} />
      </StaticRouter>,
    );
    expect(wrapper.find('.active').length).toBe(1);
    expect(wrapper.find('.active').at(0).text()).toMatch('Plans');
  });

  it('changes to list tab from map tab', () => {
    const spy = sinon.spy();
    const wrapper = Enzyme.mount(
      <StaticRouter basename="/results">
        <NavWithTabs currentPage="map" onClickMap={jest.fn()} onClickList={spy} onClickPlans={jest.fn()} />
      </StaticRouter>,
    );

    wrapper.find('.tab').at(1).simulate('click');
    expect(spy.calledOnce).toBe(true);
  });

  it('changes to map tab from list tab', () => {
    const spy = sinon.spy();
    const wrapper = Enzyme.mount(
      <StaticRouter basename="/results">
        <NavWithTabs currentPage="list" onClickMap={spy} onClickList={jest.fn()} />
      </StaticRouter>,
    );

    wrapper.find('.tab').at(0).simulate('click');
    expect(spy.calledOnce).toBe(true);
  });

  it('shows user not logged in', () => {
    const wrapper = Enzyme.mount(
      <StaticRouter basename="/results">
        <NavWithTabs currentPage="list" onClickMap={jest.fn()} onClickList={jest.fn()} onClickPlans={jest.fn()} />
      </StaticRouter>,
    );

    expect(wrapper.find('.account').at(0).text().includes('Log In')).toBe(true);
  });

  it('calls login function when log in is clicked', () => {
    const wrapper = Enzyme.mount(
      <StaticRouter basename="/results">
        <NavWithTabs currentPage="list" onClickMap={jest.fn()} onClickList={jest.fn()} onClickPlans={jest.fn()} />
      </StaticRouter>,
    );

    wrapper.find('.account button').at(0).simulate('click');
    expect(loginSpy.calledOnce).toBe(true);
  });

  it('shows user logged in', () => {
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      user: {
        email: 'hubermjonathan@gmail.com',
        email_verified: true,
      },
      logout: logoutSpy,
      loginWithRedirect: loginSpy,
    });
    const wrapper = Enzyme.mount(
      <StaticRouter basename="/results">
        <NavWithTabs currentPage="list" onClickMap={jest.fn()} onClickList={jest.fn()} onClickPlans={jest.fn()} />
      </StaticRouter>,
    );

    expect(wrapper.find('.account').at(0).text().includes('Hello,')).toBe(true);
  });

  it('calls logout function when log out is clicked', () => {
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      user: {
        email: 'hubermjonathan@gmail.com',
        email_verified: true,
      },
      logout: logoutSpy,
      loginWithRedirect: loginSpy,
    });
    const wrapper = Enzyme.mount(
      <StaticRouter basename="/results">
        <NavWithTabs currentPage="list" onClickMap={jest.fn()} onClickList={jest.fn()} onClickPlans={jest.fn()} />
      </StaticRouter>,
    );

    wrapper.find('.account button').at(0).simulate('click');
    expect(logoutSpy.calledOnce).toBe(true);
  });
});
