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

class App extends Component {
  render() {
    return (
        <Router>
          <div className="App">
            <Routes>
              <Route exact path="/" element={<LoginPage />} />
              <Route exact path="/createAccount" element={<CreateAccountPage />} />
              <Route exact path="/communitySearch" element={<CommunitySearchPage />} />
              <Route exact path="/communityDetails/:county" element={<CommunityPage />} />
            </Routes>
          </div>
        </Router>
    );
  }
}

export default App;
