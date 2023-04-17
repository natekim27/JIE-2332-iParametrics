import React, { Component } from 'react';
import HeaderBanner from '../HeaderBanner/HeaderBanner';
import CreateAccountForm from './CreateAccountForm';

import './CreateAccountPage.css';

class CreateAccountPage extends Component {
  render() {
    return (
      <div className='font-face-gs'>
        <HeaderBanner />
        <div className="CreateAccountPage">
          <CreateAccountForm />
        </div>
      </div>
    );
  }
}

export default CreateAccountPage;
