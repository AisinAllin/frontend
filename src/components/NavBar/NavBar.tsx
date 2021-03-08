/* eslint-disable*/
import React from 'react';
import { connect } from 'react-redux';
import UserProfileIcon from './components/UserProfileIcon/UserProfileIcon';
import AwLogo from './components/AwLogo/AwLogo';
import './NavBar.scss';

const NavBar = (props:any) =>{
  return (
    <nav>
      <div className="aw-logo">
        <a href="/ProjectList" className="nav_link" aria-label="switch project" role="button" aria-haspopup="true">
          <AwLogo />
        </a>
      </div>
      <div className=" userIcon">
        <a href="/account" className="nav_link" aria-label="notification" role="button" aria-haspopup="true">
          <UserProfileIcon name={props.value} size="30" />
        </a>
      </div>
    </nav>
  );
}

const mapStateToProps = (state:any)=>{
  return state;
};

export default connect(mapStateToProps)(NavBar);
