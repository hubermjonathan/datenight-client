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


  it('renders the share buttons for each card', () => {
    const wrapper = Enzyme.mount(
      <StaticRouter basename="/results">
        <Plans loading={false} plans={plans} handleShare={jest.fn()} handleDelete={jest.fn()} />
      </StaticRouter>,
    );
    expect(wrapper.find('button.cardShareBtn')).toHaveLength(2);
  });
});
