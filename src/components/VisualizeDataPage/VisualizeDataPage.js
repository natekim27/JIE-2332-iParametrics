import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import HeaderBanner from '../HeaderBanner/HeaderBanner';
import VisualizeData from './VisualizeData';
import './VisualizeDataPage.css';

const buttonStyle = {
  marginTop: 20,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'row',
};

class VisualizeDataPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isNational: false,
      key: 0,
    };
  }

  render() {
    return (
      <div>
        <HeaderBanner header={"Visualize Data"}/>
        <div className="VisualizeDataPage">
          <div style={buttonStyle}>
            <Button variant="outline-secondary" type="submit" onClick={() => this.setState({isNational: !this.state.isNational, key: this.state.key + 1})}>
              {this.state.isNational ? "Set to State" : "Set to National"}
            </Button>
          </div>
          <VisualizeData key={this.state.key} isNational={this.state.isNational}></VisualizeData>
        </div>
      </div>
    );
  }
}

export default VisualizeDataPage;