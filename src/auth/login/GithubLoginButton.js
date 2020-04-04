import React from 'react';
import SVGIcon from '../../Icons/SVGIcon';

const GithubLoginButton = () => {
  return (
    <a href='http://localhost:4000/auth/github' style={{ padding: '1vh' }}>
      <button className='loginbtn'>
        <span className='loginbtn-content'>
          <SVGIcon name='Github' height='1em' width='1em' />
          GitHub
        </span>
      </button>
    </a>
  );
};

export default GithubLoginButton;
