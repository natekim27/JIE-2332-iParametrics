import React, { Component } from 'react';
import EditCommunityDetailsForm from './EditCommunityDetailsForm';

import './EditCommunityDetailsPage.css';

class EditCommunityDetailsPage extends Component {
  render() {
    return (
      <div className="EditCommunityDetailsPage">
        <EditCommunityDetailsForm />
      </div>
    );
  }
}

export default EditCommunityDetailsPage;