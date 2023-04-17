import React, { Component } from 'react';
import HeaderBanner from '../HeaderBanner/HeaderBanner';
import CommunityCompareDetails from './CommunityCompareDetails';

import './CommunityComparePage.css';

class CommunityComparePage extends Component {
  render() {
    return (
      <div>
        <HeaderBanner header={"Compare Communities"}/>
        <div className="CommunityComparePage">
          <CommunityCompareDetails />
        </div>
      </div>
    );
  }
}

export default CommunityComparePage;