/* eslint-disable*/
import * as React from 'react';
import { connect } from 'react-redux';
import NavBar from '../NavBar/NavBar';
import * as actionCreators from '../../stroe/actions/index';
import LoginTest from './LoginTest';
// import {
//     BrowserRouter as Router,
//     Switch,
//     Route,
//     Link
// } from "react-router-dom";

const Dashboard = (props:any) => {
  console.log('Dashboard', props.value);
  console.log('Dashboard', props.loadName);

  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <LoginTest handleClick={props.loadName} value={props.value} />
      </div>
    </div>
  );
};

const mapStateToProps = (state:any) => state;

export default connect(mapStateToProps, actionCreators)(Dashboard);
