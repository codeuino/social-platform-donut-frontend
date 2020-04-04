import React from 'react';
import SVGIcon from '../../Icons/SVGIcon';

const GoogleLoginButton = () => {
  return (
    <a href='http://localhost:4000/auth/google' style={{ padding: '1vh' }}>
      <button className='loginbtn'>
        <span className='loginbtn-content'>
          <SVGIcon name='Google' width='18' height='18' />
          Google
        </span>
      </button>
    </a>
  );
};

export default GoogleLoginButton;
