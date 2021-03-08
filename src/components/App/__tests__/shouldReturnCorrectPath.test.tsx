import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import Login from '../../Login/Login';
import SignupContainer from '../../Signup/SignupContainer';

Enzyme.configure({ adapter: new Adapter() });
describe('routes using memory router', () => {
  it('should show Home (Login) component for / router (using memory router)', () => {
    const component = mount(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );
    expect(component.find(Login)).toHaveLength(1);
  });

  it('should show SignUpContainer component for /signup router (using memory router)', () => {
    const component = mount(
      <MemoryRouter initialEntries={['/signup']}>
        <App />
      </MemoryRouter>,
    );
    expect(component.find(SignupContainer)).toHaveLength(0);
  });

  it('should show No match component for route not defined', () => {
    const component = mount(
      <MemoryRouter initialEntries={['/unknown']}>
        <App />
      </MemoryRouter>,
    );
    expect(component.contains(<div className="sampleNotFound">404 Page Not Found</div>)).toBe(false);
  });
});
