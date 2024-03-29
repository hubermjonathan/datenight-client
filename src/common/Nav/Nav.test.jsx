import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { StaticRouter } from 'react-router-dom';
import sinon from 'sinon';
import Nav from './Nav';
import { useAuth0 } from '../authHook';

Enzyme.configure({ adapter: new Adapter() });
jest.mock('../authHook');
const loginSpy = sinon.spy();
const logoutSpy = sinon.spy();

describe('<Nav />', () => {
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
        <Nav currentPage="map" onClickMap={jest.fn()} onClickList={jest.fn()} />
      </StaticRouter>,
    );
    expect(wrapper.find('.nav').length).toBe(1);
  });

  it('renders the account button', () => {
    const wrapper = Enzyme.mount(
      <StaticRouter basename="/results">
        <Nav currentPage="map" onClickMap={jest.fn()} onClickList={jest.fn()} />
      </StaticRouter>,
    );
    expect(wrapper.find('.account').length).toBe(1);
  });

  it('shows user not logged in', () => {
    const wrapper = Enzyme.mount(
      <StaticRouter basename="/results">
        <Nav currentPage="list" onClickMap={jest.fn()} onClickList={jest.fn()} />
      </StaticRouter>,
    );

    expect(wrapper.find('.account').at(0).text().includes('Log In')).toBe(true);
  });

  it('calls login function when log in is clicked', () => {
    const wrapper = Enzyme.mount(
      <StaticRouter basename="/results">
        <Nav currentPage="list" onClickMap={jest.fn()} onClickList={jest.fn()} />
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
        <Nav currentPage="list" onClickMap={jest.fn()} onClickList={jest.fn()} />
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
        <Nav currentPage="list" onClickMap={jest.fn()} onClickList={jest.fn()} />
      </StaticRouter>,
    );

    wrapper.find('.account button').at(0).simulate('click');
    expect(logoutSpy.calledOnce).toBe(true);
  });
});
