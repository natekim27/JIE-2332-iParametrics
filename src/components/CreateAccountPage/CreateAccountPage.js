import React, { Component } from 'react';
import CreateAccountForm from './CreateAccountForm';

import './CreateAccountPage.css';

class CreateAccountPage extends Component {
  render() {
    return (
      <div className="CreateAccountPage">
        <CreateAccountForm />
      </div>
    );
  }
}

export default CreateAccountPage;
