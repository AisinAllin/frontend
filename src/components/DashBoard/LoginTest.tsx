/* eslint-disable*/
import React from 'react';

const LoginTest = (props:any) => {
  console.log("LoginTest", props.value)
  
  return(
    <div>
      <button onClick={props.value}> get name </button>
    </div>
  );
};

export default LoginTest;
