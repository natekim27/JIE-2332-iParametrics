import React, { Component } from 'react';
import CommunityDetails from './CommunityDetails';

import './CommunityPage.css';

class CommunityPage extends Component {
  render() {
    return (
      <div className="CommunityPage">
        <CommunityDetails />
      </div>
    );
  }
}

export default CommunityPage;
