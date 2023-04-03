import React, { Component } from 'react';
import HeaderBanner from '../HeaderBanner/HeaderBanner';
import LoginForm from './LoginForm';

import './LoginPage.css';

class LoginPage extends Component {
  render() {
    return (
      <div>
        <HeaderBanner />
        <div className="LoginPage">
          <LoginForm />
        </div>
      </div> 
    );
  }
}

export default LoginPage;
