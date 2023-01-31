import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import CwcsData from '../../cwcs.json';
import unnormalizedData from '../../cwcs_unnormalized.json';

const div1Style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'row',
  height: 50
};

const buttonStyle = {
  marginTop: 20,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'row',
};

const CommunityDetails = () => {
  const navigate = useNavigate();
  const { county } = useParams();
  const filteredData = CwcsData.find(community => community.REGION === county);
  const unnormData = unnormalizedData.find(community => community.REGION === county);

  return (
    <div>
      <div style={div1Style}>
        <h2>iParametrics</h2>
      </div>
      <div style={div1Style}>
        <h4>{county}</h4>
      </div>
      <div style={div1Style}>
        <h4>CWCS: {filteredData.CWCS}</h4>
      </div>
      <div style={div1Style}>
        <h4>Factors:</h4>
      </div>
      <div>
        <ul>
          <li>{filteredData.FACTORS[0]}</li>
          <li>{filteredData.FACTORS[1]}</li>
          <li>{filteredData.FACTORS[2]}</li>
        </ul>
      </div>
      <div>
        <h4>Backing Data:</h4>
        <ul>
          <li>POPULATION: {unnormData.POPULATION}</li>
          <li>GDP: {unnormData.GDP}</li>
          <li>AVERAGE DEMOCRATIC % OF VOTES: {unnormData.AVG_DEM_PCT * 100}</li>
          <li>AVERAGE REPUBLICAN % OF VOTES: {unnormData.AVG_REP_PCT * 100}</li>
          <li>HM: {unnormData.HM}</li>
          <li>PA: {unnormData.PA}</li>
        </ul>
      </div>
      <div style={buttonStyle}>
        <Button variant="outline-secondary" type="submit" onClick={() => navigate("/communitySearch", { replace: true })}>
          Back to Search
        </Button>
      </div>
    </div>
  );
}

export default CommunityDetails;
