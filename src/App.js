import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import LoginPage from './components/LoginPage/LoginPage';
import './App.css';
import CreateAccountPage from './components/CreateAccountPage/CreateAccountPage';
import CommunitySearchPage from './components/CommunitySearchPage/CommunitySearchPage';
import CommunityPage from './components/CommunityPage/CommunityPage';
import VisualizeDataPage from './components/VisualizeDataPage/VisualizeDataPage';

class App extends Component {
  render() {
    return (
        <Router>
          <div className="App">
            <Routes>
              <Route exact path="/" element={<LoginPage />} />
              <Route exact path="/createAccount" element={<CreateAccountPage />} />
              <Route exact path="/communitySearch" element={<CommunitySearchPage />} />
              <Route exact path="/communityDetails/:sno" element={<CommunityPage />} />
              <Route exact path="/visualizeData/:county" element={<VisualizeDataPage />} />
            </Routes>
          </div>
        </Router>
    );
  }
}

export default App;
