import React, { Component } from 'react';
import HeaderBanner from '../HeaderBanner/HeaderBanner';
import AddCommunityForm from './AddCommunityForm';

import './AddCommunityPage.css';

class AddCommunityPage extends Component {
  render() {
    return (
      <div>
        <HeaderBanner header={"Add a Community"}/>
        <div className="AddCommunityPagePage">
          <AddCommunityForm />
        </div>
      </div>
    );
  }
}

export default AddCommunityPage;