import React, { Component } from 'react';
import HeaderBanner from '../HeaderBanner/HeaderBanner';
import EditCommunityDetailsForm from './EditCommunityDetailsForm';

import './EditCommunityDetailsPage.css';

class EditCommunityDetailsPage extends Component {
  render() {
    return (
      <div className='font-face-gs'>
        <HeaderBanner header={"Edit Community Details"}/>
        <div className="EditCommunityDetailsPage">
          <EditCommunityDetailsForm />
        </div>
      </div>
    );
  }
}

export default EditCommunityDetailsPage;