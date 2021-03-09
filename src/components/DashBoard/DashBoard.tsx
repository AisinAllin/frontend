/* eslint-disable*/
import * as React from 'react';
import { connect } from 'react-redux';
import NavBar from '../NavBar/NavBar';

import { loadName } from '../../stroe/actions/index';
import LoginTest from './LoginTest';

const Dashboard = (props:any) => {
  console.log('Dashboard', props.value);
  console.log('Dashboard', props.fetchName);

  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <LoginTest value={props.fetchName} />
      </div>
    </div>
  );
};

const mapStateToProps = (state:any) => state;

const mapDispathcToProps = (dispatch: any) => {
  return {
    fetchName: (value:string) => dispatch(loadName()),
  }
}

export default connect(mapStateToProps, mapDispathcToProps)(Dashboard);
