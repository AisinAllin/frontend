import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import Login from '../Login/Login';
import SignupContainer from '../Signup/SignupContainer';
import DashBoard from '../DashBoard/DashBoard';
import theme from './theme';
import './App.scss';

const App = () => (
  <ThemeProvider theme={theme}>
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/signup" component={SignupContainer} />
        <Route path="/login" component={Login} />
        <Route path="/DashBoard" component={DashBoard} />
        <Route>
          <div className="sampleNotFound">404 Page Not Found</div>
        </Route>
      </Switch>
    </Router>
  </ThemeProvider>
);

export default App;
