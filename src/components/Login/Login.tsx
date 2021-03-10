/* eslint-disable*/
import React from 'react';
import {
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { loadName } from '../../stroe/actions/index';
import logo from './assets/asyncWorkingLogo.svg';
import LoginForm from './components/loginForm/LoginForm';
import './Login.scss';
import { getMaxListeners } from 'node:process';

const Login = (props: any) => {
  
  return (
  <header className="login-header">
    <Grid container item xs={12} sm={6} alignItems="center" direction="column" className="grid">
      <Paper elevation={10} variant="outlined" className="paper">
        <Grid container justify="center" alignItems="center" direction="column">
          <img src={logo} className="img" alt="logo" />
          <Typography component="h1" variant="h5">
            Sign In to Async Working
          </Typography>
        </Grid>
        <LoginForm />
      </Paper>
    </Grid>
  </header>
  )
};
// const mapStateToProps = (state:any) => state;

// const mapDispathcToProps = (dispatch: any) => {
//   return {
//     fetchName: (value:string) => dispatch(loadName(value)),
//   }
// }
export default Login;

// export default connect(mapStateToProps, mapDispathcToProps)(Login);
