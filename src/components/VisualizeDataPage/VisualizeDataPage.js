import React, { Component } from 'react';

import HeaderBanner from '../HeaderBanner/HeaderBanner';
import VisualizeData from './VisualizeData';
import './VisualizeDataPage.css';

class VisualizeDataPage extends Component {
  render() {
    return (
      <div>
        <HeaderBanner header={"Visualize Data"}/>
        <div className="VisualizeDataPage">
          <VisualizeData></VisualizeData>
        </div>
      </div>
    );
  }
}

export default VisualizeDataPage;