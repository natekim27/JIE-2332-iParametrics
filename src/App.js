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
import CommunityCompareSearch from './components/CommunityCompareSearch/CommunityCompareSearch';
import CommunityComparePage from './components/CommunityComparePage/CommunityComparePage';
import CommunityPage from './components/CommunityPage/CommunityPage';
import VisualizeDataPage from './components/VisualizeDataPage/VisualizeDataPage';
import EditCommunityDetailsPage from './components/EditCommunityDetails/EditCommunityDetailsPage';
import AddCommunityPage from './components/AddCommunityPage/AddCommunityPage';

class App extends Component {
  render() {
    return (
        <Router>
          <div className="App">
            <Routes>
              <Route exact path="/" element={<LoginPage />} />
              <Route exact path="/createAccount" element={<CreateAccountPage />} />
              <Route exact path="/communitySearch" element={<CommunitySearchPage />} />
              <Route exact path="/communityCompareSearch/:sno" element={<CommunityCompareSearch />} />
              <Route exact path="/communityCompareDetails/:sno1/:sno2" element={<CommunityComparePage />} />
              <Route exact path="/communityDetails/:sno" element={<CommunityPage />} />
              <Route exact path="/visualizeData/:sno" element={<VisualizeDataPage />} />
              <Route exact path="/editCommunityDetails/:sno" element={<EditCommunityDetailsPage />} />
              <Route exact path="/addCommunity" element={<AddCommunityPage />} />
            </Routes>
          </div>
        </Router>
    );
  }
}

export default App;
