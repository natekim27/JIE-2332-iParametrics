import React, { useEffect, useState } from 'react';
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
    const { sno } = useParams();
    const [filteredData, setFilteredData] = useState({});
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetch(`http://127.0.0.1:5000/features/get-by-sno?sno=${sno}`, {
            method: "GET",
        })
        .then((response) => response.json())
        .then((data) => {
            setFilteredData(data);
        })
        .catch((err) => {
            console.log(err.message);
            setMessage(err.message);
        });
    }, []);

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
    };

    const exportToJson = e => {
        e.preventDefault();
        downloadFile({
        data: JSON.stringify(filteredData[0]),
        fileName: filteredData[0].name + '_' + filteredData[0].stusps + '.json',
        fileType: 'text/json',
        });
    };

    const exportToCsv = e => {
        e.preventDefault();

        // Headers for each column
        let headers = ['name,stusps,cwcs,population,gdp,avg_dem_pct,avg_rep_pct,declarations,hm,pa,hm_plan_status,nri,cdc_svi,hvri_sovi,high_comb_haz_com,high_comb_haz_res,em_employment,em_employment_per,em_lq,urban_rural,college_univ,higher_ed,poverty,broadband,health_insurance,voter_turn,pop_change,income_stability,built_environment,operating_ratio,taxes,bric_social,bric_econ,bric_house,bric_community,bric_institutional,bric_environmental,bric_resilience,factors'];

        // Convert users data to a csv
        let communityCsv = [filteredData[0].name + ','
                            + filteredData[0].stusps + ','
                            + filteredData[0].cwcs + ','
                            + filteredData[0].population + ','
                            + filteredData[0].gdp + ','
                            + filteredData[0].avg_dem_pct + ','
                            + filteredData[0].avg_rep_pct + ','
                            + filteredData[0].declarations + ','
                            + filteredData[0].hm + ','
                            + filteredData[0].pa + ','
                            + filteredData[0].hm_plan_status + ','
                            + filteredData[0].nri + ','
                            + filteredData[0].cdc_svi + ','
                            + filteredData[0].hvri_sovi + ','
                            + filteredData[0].high_comb_haz_com + ','
                            + filteredData[0].high_comb_haz_res + ','
                            + filteredData[0].em_employment + ','
                            + filteredData[0].em_employment_per + ','
                            + filteredData[0].em_lq + ','
                            + filteredData[0].urban_rural + ','
                            + filteredData[0].college_univ + ','
                            + filteredData[0].higher_ed + ','
                            + filteredData[0].poverty + ','
                            + filteredData[0].broadband + ','
                            + filteredData[0].health_insurance + ','
                            + filteredData[0].voter_turn + ','
                            + filteredData[0].pop_change + ','
                            + filteredData[0].income_stability + ','
                            + filteredData[0].built_environment + ','
                            + filteredData[0].operating_ratio + ','
                            + filteredData[0].taxes + ','
                            + filteredData[0].bric_social + ','
                            + filteredData[0].bric_econ + ','
                            + filteredData[0].bric_house + ','
                            + filteredData[0].bric_community + ','
                            + filteredData[0].bric_institutional + ','
                            + filteredData[0].bric_environmental + ','
                            + filteredData[0].bric_resilience + ','
                            + '[' + filteredData[0].factors + ']'];

        downloadFile({
        data: [...headers, ...communityCsv].join('\n'),
        fileName: filteredData[0].name + '_' + filteredData[0].stusps + '.csv',
        fileType: 'text/csv',
        });
    };

    return (
        <div>
        <div className='flexbox-container'>
            <Card sx={{ minWidth: 450 }}>
            <CardContent>
                <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                    State
                </Typography>
                <Typography variant="h4" component="div">
                    {filteredData[0] && filteredData[0].stusps}
                </Typography>
            </CardContent>
            </Card>
            <Card sx={{ minWidth: 450 }}>
            <CardContent>
                <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                    Region
                </Typography>
                <Typography variant="h4" component="div">
                    {filteredData[0] && filteredData[0].name}
                </Typography>
            </CardContent>
            </Card>
            <Card sx={{ minWidth: 450 }}>
            <CardContent>
                <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                    Population
                </Typography>
                <Typography variant="h4" component="div">
                    {filteredData[0] && filteredData[0].population}
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
                            {/* Using dummy data */}
                                CWCS
                            </Typography>
                            <Typography variant="h4" component="div">
                                {filteredData[0] && filteredData[0].population}
                            </Typography>
                        </CardContent>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* <div className='factors'>
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
        </div> */}
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
                    {filteredData[0] && filteredData[0].population}
                </Typography>
            </CardContent>
            </Card>
            <Card sx={{ width: 450 }} style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
            <CardContent>
                <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                    GDP
                </Typography>
                <Typography variant="h5" component="div">
                    {filteredData[0] && filteredData[0].gdp}
                </Typography>
            </CardContent>
            </Card>
            <Card sx={{ width: 450 }} style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
            <CardContent>
                <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                    Declaratons
                </Typography>
                <Typography variant="h5" component="div">
                    {filteredData[0] && filteredData[0].declarations}
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
                    {filteredData[0] && filteredData[0].avg_dem_pct}
                </Typography>
            </CardContent>
            </Card>
            <Card sx={{ width: 450 }} style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
            <CardContent>
                <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                    Avg Republican % of Votes
                </Typography>
                <Typography variant="h5" component="div">
                    {filteredData[0] && filteredData[0].avg_rep_pct}
                </Typography>
            </CardContent>
            </Card>
            <Card sx={{ width: 450 }} style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
            <CardContent>
                <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                    Hazard Mitigation Obligations
                </Typography>
                <Typography variant="h5" component="div">
                    {filteredData[0] && filteredData[0].hm}
                </Typography>
            </CardContent>
            </Card>
            <Card sx={{ width: 450 }} style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
            <CardContent>
                <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                    Public Assistance Obligations
                </Typography>
                <Typography variant="h5" component="div">
                    {filteredData[0] && filteredData[0].pa}
                </Typography>
            </CardContent>
            </Card>
        </div>
        <div className='flexbox-container-2'>
            <Card sx={{ width: 450 }} style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
            <CardContent>
                <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                    Hazard Mitigation Plan Status
                </Typography>
                <Typography variant="h5" component="div">
                    {filteredData[0] && filteredData[0].hm_plan_status}
                </Typography>
            </CardContent>
            </Card>
            <Card sx={{ width: 450 }} style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
            <CardContent>
                <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                    National Risk Index
                </Typography>
                <Typography variant="h5" component="div">
                    {filteredData[0] && filteredData[0].nri}
                </Typography>
            </CardContent>
            </Card>
            <Card sx={{ width: 450 }} style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
            <CardContent>
                <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                    CDC Social Vulnerability Index
                </Typography>
                <Typography variant="h5" component="div">
                    {filteredData[0] && filteredData[0].cdc_svi}
                </Typography>
            </CardContent>
            </Card>
            <Card sx={{ width: 450 }} style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
            <CardContent>
                <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                    HVRI Social Responsibility Index
                </Typography>
                <Typography variant="h5" component="div">
                    {filteredData[0] && filteredData[0].hvri_sovi}
                </Typography>
            </CardContent>
            </Card>
        </div>
        <div className='flexbox-container-2'>
            <Card sx={{ width: 450 }} style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
            <CardContent>
                <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                    Resistant Commercial Buildings %
                </Typography>
                <Typography variant="h5" component="div">
                    {filteredData[0] && filteredData[0].high_comb_haz_com}
                </Typography>
            </CardContent>
            </Card>
            <Card sx={{ width: 450 }} style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
            <CardContent>
                <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                    Resistant Residential Buildings %
                </Typography>
                <Typography variant="h5" component="div">
                    {filteredData[0] && filteredData[0].high_comb_haz_res}
                </Typography>
            </CardContent>
            </Card>
            <Card sx={{ width: 450 }} style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
            <CardContent>
                <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                    Broadband Subscription %
                </Typography>
                <Typography variant="h5" component="div">
                    {filteredData[0] && filteredData[0].broadband}
                </Typography>
            </CardContent>
            </Card>
        </div>
        <div className='flexbox-container-2'>
            <Card sx={{ width: 450 }} style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
            <CardContent>
                <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                    Emergency Manageement Directors Employement
                </Typography>
                <Typography variant="h5" component="div">
                    {filteredData[0] && filteredData[0].em_employment}
                </Typography>
            </CardContent>
            </Card>
            <Card sx={{ width: 450 }} style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
            <CardContent>
                <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                    Emergency Manageement Directors Employement / 1000 Jobs
                </Typography>
                <Typography variant="h5" component="div">
                {filteredData[0] && filteredData[0].em_employment_per}
                </Typography>
            </CardContent>
            </Card>
            <Card sx={{ width: 450 }} style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
            <CardContent>
                <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                    Emergency Manageement Directors Location Quotient
                </Typography>
                <Typography variant="h5" component="div">
                {filteredData[0] && filteredData[0].em_lq}
                </Typography>
            </CardContent>
            </Card>
        </div>
        <div className='flexbox-container-2'>
            <Card sx={{ width: 450 }} style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
            <CardContent>
                <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                    NCHS Urban-Rural Classification Scheme
                </Typography>
                <Typography variant="h5" component="div">
                    {filteredData[0] && filteredData[0].urban_rural}
                </Typography>
            </CardContent>
            </Card>
            <Card sx={{ width: 450 }} style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
            <CardContent>
                <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                    Colleges / Universities
                </Typography>
                <Typography variant="h5" component="div">
                    {filteredData[0] && filteredData[0].college_univ}
                </Typography>
            </CardContent>
            </Card>
            <Card sx={{ width: 450 }} style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
            <CardContent>
                <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                    Higher Education
                </Typography>
                <Typography variant="h5" component="div">
                    {filteredData[0] && filteredData[0].higher_ed}
                </Typography>
            </CardContent>
            </Card>
            <Card sx={{ width: 450 }} style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
            <CardContent>
                <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                    Above Poverty Line
                </Typography>
                <Typography variant="h5" component="div">
                    {filteredData[0] && filteredData[0].poverty}
                </Typography>
            </CardContent>
            </Card>
        </div>
        <div className='flexbox-container-2'>
            <Card sx={{ width: 450 }} style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
            <CardContent>
                <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                    Health Insurance
                </Typography>
                <Typography variant="h5" component="div">
                    {filteredData[0] && filteredData[0].health_insurance}
                </Typography>
            </CardContent>
            </Card>
            <Card sx={{ width: 450 }} style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
            <CardContent>
                <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                    Voter Turnout (2020)
                </Typography>
                <Typography variant="h5" component="div">
                    {filteredData[0] && filteredData[0].voter_turn}
                </Typography>
            </CardContent>
            </Card>
            <Card sx={{ width: 450 }} style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
            <CardContent>
                <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                    Population Change (2010-2020)
                </Typography>
                <Typography variant="h5" component="div">
                    {filteredData[0] && filteredData[0].pop_change}
                </Typography>
            </CardContent>
            </Card>
            <Card sx={{ width: 450 }} style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
            <CardContent>
                <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                    Income Stability
                </Typography>
                <Typography variant="h5" component="div">
                    {filteredData[0] && filteredData[0].income_stability}
                </Typography>
            </CardContent>
            </Card>
        </div>
        <div className='flexbox-container-2'>
            <Card sx={{ width: 450 }} style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
            <CardContent>
                <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                    Built Environment
                </Typography>
                <Typography variant="h5" component="div">
                    {filteredData[0] && filteredData[0].built_environment}
                </Typography>
            </CardContent>
            </Card>
            <Card sx={{ width: 450 }} style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
            <CardContent>
                <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                    Operating Ratio
                </Typography>
                <Typography variant="h5" component="div">
                    {filteredData[0] && filteredData[0].operating_ratio}
                </Typography>
            </CardContent>
            </Card>
            <Card sx={{ width: 450 }} style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
            <CardContent>
                <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                    Taxes
                </Typography>
                <Typography variant="h5" component="div">
                    {filteredData[0] && filteredData[0].taxes}
                </Typography>
            </CardContent>
            </Card>
        </div>
        <div className='flexbox-container-2'>
            <Card sx={{ width: 450 }} style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
            <CardContent>
                <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                    BRIC Social Sub-Index Score
                </Typography>
                <Typography variant="h5" component="div">
                    {filteredData[0] && filteredData[0].bric_social}
                </Typography>
            </CardContent>
            </Card>
            <Card sx={{ width: 450 }} style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
            <CardContent>
                <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                    BRIC Economic Sub-Index Score
                </Typography>
                <Typography variant="h5" component="div">
                    {filteredData[0] && filteredData[0].bric_econ}
                </Typography>
            </CardContent>
            </Card>
            <Card sx={{ width: 450 }} style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
            <CardContent>
                <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                    BRIC Housing/Infrastructure Sub-Index Score
                </Typography>
                <Typography variant="h5" component="div">
                    {filteredData[0] && filteredData[0].bric_house}
                </Typography>
            </CardContent>
            </Card>
            <Card sx={{ width: 450 }} style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
            <CardContent>
                <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                    BRIC Community Capital Sub-Index Score
                </Typography>
                <Typography variant="h5" component="div">
                    {filteredData[0] && filteredData[0].bric_community}
                </Typography>
            </CardContent>
            </Card>
        </div>
        <div className='flexbox-container-2'>
            <Card sx={{ width: 450 }} style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
            <CardContent>
                <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                    BRIC Institutional Sub-Index Score
                </Typography>
                <Typography variant="h5" component="div">
                    {filteredData[0] && filteredData[0].bric_institutional}
                </Typography>
            </CardContent>
            </Card>
            <Card sx={{ width: 450 }} style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
            <CardContent>
                <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                    BRIC Environmental Sub-Index Score
                </Typography>
                <Typography variant="h5" component="div">
                    {filteredData[0] && filteredData[0].bric_environmental}
                </Typography>
            </CardContent>
            </Card>
            <Card sx={{ width: 450 }} style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
            <CardContent>
                <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                    BRIC Resilience Score
                </Typography>
                <Typography variant="h5" component="div">
                    {filteredData[0] && filteredData[0].bric_resilience}
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
            <Button variant="outline-secondary" type="submit" onClick={() => navigate(`/visualizeData/${sno}`, { replace: true })}>
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
