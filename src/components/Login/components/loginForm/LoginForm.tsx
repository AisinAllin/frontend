/* eslint-disable*/
import React, { useState } from 'react';
import {
  Button,
  Grid,
  InputAdornment,
  TextField,
  FormControlLabel,
  Checkbox,
  Typography,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { AccountCircle, LockRounded } from '@material-ui/icons';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {
  Link,
} from 'react-router-dom';
import './LoginForm.scss';
import { loadName } from '../../../../stroe/actions/index';
import WarningMessage from '../warningMessage/WarningMessage';
import { INTERNAL_SERVIER_ERROR, USERNAME_PASSWORD_MISMATCH_ERROR } from './const/const';

type LoginDetails = {
  email: string;
  password: string;
  remember: boolean;
};

const LoginForm = (props: any) => {
  const [isSubmitBtnDisabled, setIsSubmitBtnDisabled] = useState(false);
  const [warning, setWarning] = useState({
    shown: false,
    message: '',
  });
  const initialValues = {
    email: '',
    password: '',
    remember: false,
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Please enter valid email').required('Email Required!'),
    password: Yup.string().required('Password Required!'),
  });

  const onSubmit = async ({ email, password, remember }: LoginDetails) => {
    setIsSubmitBtnDisabled(true);

    await axios({
      method: 'post',
      url: process.env.REACT_APP_ASYNC_WORK_LOGIN_API,
      data: {
        email,
        password,
        remember,
      },
    }).catch((error) => {
      if (error.response.status >= 500) {
        setWarning({
          shown: true,
          message: INTERNAL_SERVIER_ERROR,
        });
      }
      if (error.response.status >= 400 && error.response.status < 500) {
        setWarning({
          shown: true,
          message: USERNAME_PASSWORD_MISMATCH_ERROR,
        });
      }
    }).finally(() => {
      setIsSubmitBtnDisabled(false);
    });
  };

  const handleClick = ({email}:LoginDetails) => {
    const { fetchName } = props;
    fetchName(email);
  }

  return (
    <div className="login_form">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        onClick={handleClick}
      >
        {() => (
          <Form>
            {warning.shown ? <WarningMessage content={warning.message} /> : null}
            <Field
              as={TextField}
              label="Email"
              name="email"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              autoFocus
              autoComplete="email"
              helperText={(
                <ErrorMessage name="email">
                  { (msg) => <span className="errorMessage">{msg}</span>}
                </ErrorMessage>
              )}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />
            <Field
              data-testid="passwordInput"
              as={TextField}
              label="Password"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password"
              type="password"
              name="password"
              autoComplete="current-password"
              helperText={(
                <ErrorMessage name="password">
                  { (msg) => <span className="errorMessage">{msg}</span>}
                </ErrorMessage>
              )}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockRounded />
                  </InputAdornment>
                ),
              }}
            />
            <div className="remember">
              <Field
                as={FormControlLabel}
                control={<Checkbox value="remember" style={{ color: '#2ab782' }} />}
                label="Remember me"
                name="remember"
              />
            </div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{ backgroundColor: '#2ab782' }}
              disabled={isSubmitBtnDisabled}
              // onClick={props.value}
            >
              Sign in
            </Button>
            
            <Link to={`/Dashboard`}>
              {/* <Button onClick={handleClick}>test</Button> */}
              <Button>test</Button>
            </Link>
            
            <div style={{ height: 10 }} />
            <Grid container direction="row" justify="space-between" alignItems="center">
              <Grid item>
                <Typography>
                  <Link className="link" to="/">
                    Forgot Password?
                  </Link>
                </Typography>
              </Grid>
              <Grid item>
                <Typography>
                  Do not have an account?
                  <Link id="signUpLink" className="link" to="/signup">
                    Sign Up
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </div>
  );
};
const mapStateToProps = (state:any) => state;

const mapDispathcToProps = (dispatch: any) => {
  return {
    fetchName: (value:string) => dispatch(loadName(value)),
  }
}

export default connect(mapStateToProps, mapDispathcToProps)(LoginForm)