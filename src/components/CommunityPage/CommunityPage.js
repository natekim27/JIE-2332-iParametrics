import React, { Component } from 'react';
import HeaderBanner from '../HeaderBanner/HeaderBanner';
import CommunityDetails from './CommunityDetails';

import './CommunityPage.css';

class CommunityPage extends Component {
  render() {
    return (
      <div className='font-face-gs'>
        <HeaderBanner header={"Community"}/>
        <div className="CommunityPage">
          <CommunityDetails />
        </div>
      </div>
    );
  }
}

export default CommunityPage;