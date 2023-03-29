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
import CommunityPage from './components/CommunityComparePage/CommunityComparePage';
import VisualizeDataPage from './components/VisualizeDataPage/VisualizeDataPage';
import EditCommunityDetailsPage from './components/EditCommunityDetails/EditCommunityDetailsPage';
import CommunityCompareSearch from './components/CommunityCompareSearch/CommunityCompareSearch';

class App extends Component {
  render() {
    return (
        <Router>
          <div className="App">
            <Routes>
              <Route exact path="/" element={<LoginPage />} />
              <Route exact path="/createAccount" element={<CreateAccountPage />} />
              <Route exact path="/communitySearch" element={<CommunitySearchPage />} />
              <Route exact path="/communityCompareSearch" element={<CommunityCompareSearch />} />
              <Route exact path="/communityCompareDetails/:sno" element={<CommunityComparePage />} />
              <Route exact path="/communityDetails/:sno" element={<CommunityPage />} />
              <Route exact path="/visualizeData/:sno" element={<VisualizeDataPage />} />
              <Route exact path="/editCommunityDetails/:sno" element={<EditCommunityDetailsPage />} />
            </Routes>
          </div>
        </Router>
    );
  }
}

export default App;
