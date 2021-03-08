import React from 'react';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import { act, render, fireEvent, screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import LoginForm from '../../LoginForm';
import { USERNAME_PASSWORD_MISMATCH_ERROR } from '../../const/const';

describe('LoginForm Component', () => {
  const server = setupServer(
    rest.post(process.env.REACT_APP_ASYNC_WORK_LOGIN_API || 'http://localhost:8080/api/v1/login', (req, res, ctx) => res(
      // Send a valid HTTP status code
      ctx.status(400),
      // And a response body, if necessary
      ctx.json({
        errorMessage: 'User not found',
      }),
    )),
  );

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should display correct error alert when username and password is wrong', async () => {
    render(
      <Router>
        <LoginForm />
      </Router>,
    );

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const signInButton = screen.getByText('Sign in');

    act(() => {
      fireEvent.change(emailInput, { target: { value: 'demo@demo.com' } });
    });

    act(() => {
      fireEvent.change(passwordInput, { target: { value: 'password' } });
    });

    act(() => {
      fireEvent.click(signInButton);
    });

    expect(await screen.findByText(USERNAME_PASSWORD_MISMATCH_ERROR)).toBeInTheDocument();
  });
});
