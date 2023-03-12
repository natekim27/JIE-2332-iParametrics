import React from 'react';
import { Button } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CwcsData from '../../cwcs.json';
import unnormalizedData from '../../cwcs_unnormalized.json';
import './CommunityPage.css';

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

  const convertAllCapStringToFormat = ( capitalizedStr ) => {
    const words = capitalizedStr.split(' ');
    const capitalizedWords = words.map( word => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });
    return capitalizedWords.join(' ');
  }

  const downloadFile = ({ data, fileName, fileType }) => {
    const blob = new Blob([data], { type: fileType });
  
    const a = document.createElement('a');
    a.download = fileName;
    a.href = window.URL.createObjectURL(blob);
    const clickEvt = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    a.dispatchEvent(clickEvt);
    a.remove();
  }
  
  const exportToJson = e => {
    e.preventDefault();
    downloadFile({
      data: JSON.stringify(Object.assign({}, filteredData, unnormData)),
      fileName: filteredData.REGION + '_' + filteredData.STATE + '.json',
      fileType: 'text/json',
    });
  }
  
  const exportToCsv = e => {
    e.preventDefault();
  
    // Headers for each column
    let headers = ['REGION,STATE,CWCS,POPULATION,GDP,AVG_DEM_PCT,AVG_REP_PCT,DECLARATIONS,HM,PA,FACTORS'];
  
    // Convert users data to a csv
    let communityCsv = [filteredData.REGION + ','
                        + filteredData.STATE + ','
                        + filteredData.CWCS + ',' 
                        + unnormData.POPULATION + ',' 
                        + unnormData.GDP + ',' 
                        + unnormData.AVG_DEM_PCT + ',' 
                        + unnormData.AVG_REP_PCT + ',' 
                        + unnormData.DECLARATIONS + ',' 
                        + unnormData.HM + ','
                        + unnormData.PA + ','
                        + '[' + filteredData.FACTORS + ']'];
  
    downloadFile({
      data: [...headers, ...communityCsv].join('\n'),
      fileName: filteredData.REGION + '_' + filteredData.STATE + '.csv',
      fileType: 'text/csv',
    });
  }

  let dem_pct = unnormData.AVG_DEM_PCT * 100;
  let rep_pct = unnormData.AVG_REP_PCT * 100;

  return (
    <div>
      <div className='flexbox-container'>
        <Card sx={{ minWidth: 450 }}>
          <CardContent>
            <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
              State
            </Typography>
            <Typography variant="h4" component="div">
              {filteredData.STATE}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ minWidth: 450 }}>
          <CardContent>
            <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
              Region
            </Typography>
            <Typography variant="h4" component="div">
              {county}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ minWidth: 450 }}>
          <CardContent>
            <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
              Population
            </Typography>
            <Typography variant="h4" component="div">
              10K
            </Typography>
          </CardContent>
        </Card>
      </div>
      <div class="container">
          <div class="row align-items-center">
              <div class="col-5 mx-auto">
                  <div class="card shadow border">
                      <div class="card-body d-flex flex-column align-items-center">
                      <CardContent>
                        <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                          CWCS
                        </Typography>
                        <Typography variant="h4" component="div">
                          {filteredData.CWCS}
                        </Typography>
                      </CardContent>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      <div className='factors'>
        <h3>Top Factors</h3>
      </div>
      <div className='flexbox-container'>
        <Card sx={{ width: 450 }} style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
          <CardContent>
            <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                Factor 1
            </Typography>
            <Typography variant="h5" component="div">
              {convertAllCapStringToFormat(filteredData.FACTORS[0])}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ width: 450 }} style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
          <CardContent>
            <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                Factor 2
            </Typography>
            <Typography variant="h5" component="div">
              {convertAllCapStringToFormat(filteredData.FACTORS[1])}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ width: 450 }} style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
          <CardContent>
            <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                Factor 3
            </Typography>
            <Typography variant="h5" component="div">
              {convertAllCapStringToFormat(filteredData.FACTORS[2])}
            </Typography>
          </CardContent>
        </Card>
      </div>
      <div className='factors'>
        <h3>Backing Data</h3>
      </div>
      <div className='flexbox-container-2'>
        <Card sx={{ width: 450 }} style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
          <CardContent>
            <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                Population
            </Typography>
            <Typography variant="h5" component="div">
              {unnormData.POPULATION}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ width: 450 }} style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
          <CardContent>
            <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                GDP
            </Typography>
            <Typography variant="h5" component="div">
              {unnormData.GDP}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ width: 450 }} style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
          <CardContent>
            <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                Declaratons
            </Typography>
            <Typography variant="h5" component="div">
              {unnormData.DECLARATIONS}
            </Typography>
          </CardContent>
        </Card>
      </div>
      <div className='flexbox-container-2'>
        <Card sx={{ width: 450 }} style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
          <CardContent>
            <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                Avg Democratic % of Votes
            </Typography>
            <Typography variant="h5" component="div">
              {dem_pct}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ width: 450 }} style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
          <CardContent>
            <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
              Avg Republican % of Votes
            </Typography>
            <Typography variant="h5" component="div">
              {rep_pct}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ width: 450 }} style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
          <CardContent>
            <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                HM Obligations
            </Typography>
            <Typography variant="h5" component="div">
              {unnormData.HM}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ width: 450 }} style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
          <CardContent>
            <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                PA Obligations
            </Typography>
            <Typography variant="h5" component="div">
              {unnormData.PA}
            </Typography>
          </CardContent>
        </Card>
      </div>
      <div className='flexbox-container'>
        <div style={buttonStyle}>
          <Button variant="outline-secondary" type="submit" onClick={() => navigate("/communitySearch", { replace: true })}>
            Back to Search
          </Button>
        </div>
        <div style={buttonStyle}>
          <Button variant="outline-secondary" type="submit" onClick={() => {}}>
            Visualize Data
          </Button>
        </div>
        <div style={buttonStyle}>
        <Dropdown>
          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              Download Data
          </Dropdown.Toggle>
          <Dropdown.Menu>
              <Dropdown.Item onClick={exportToCsv}>Export to CSV</Dropdown.Item>
              <Dropdown.Item onClick={exportToJson}>Export to JSON</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        </div>
      </div>
    </div>
  );
}

export default CommunityDetails;
