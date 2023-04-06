import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import './CommunityPage.css';

const buttonStyle = {
  marginTop: 20,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'row',
};

function nFormatter(num, digits) {
    const lookup = [
      { value: 1, symbol: "" },
      { value: 1e3, symbol: "K" },
      { value: 1e6, symbol: "M" }
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookup.slice().reverse().find(function(item) {
      return num >= item.value;
    });
    return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
}

const CommunityDetails = () => {
    const navigate = useNavigate();
    const { sno } = useParams();
    const [filteredData, setFilteredData] = useState({});
    const [message, setMessage] = useState("");
    const [extendedView, setExtendedView] = useState(false);

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

    let handleDelete = async () => {
        let res = await fetch(`http://127.0.0.1:5000/features/delete?sno=${sno}`, {
            method: "GET",
        });
        if (res.status === 200) {
            console.log(message);
            setMessage("Community updated successfully");
        } else {
            setMessage("Some error occured");
        }
        navigate("/communitySearch", { replace: true });
    };

    const convertAllCapStringToFormat = ( capitalizedStr ) => {
        const words = capitalizedStr.split(' ');
        const capitalizedWords = words.map( word => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        });
        return capitalizedWords.join(' ');
    };

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
        let headers = ['name,stusps,cwcs,population,gdp,avg_dem_pct,avg_rep_pct,declarations,hm,pa,hm_plan_status,nri,cdc_svi,hvri_sovi,high_comb_haz_com,high_comb_haz_res,em_employment,em_employment_per,em_lq,urban_rural,college_univ,higher_ed,poverty,broadband,health_insurance,voter_turn,pop_change,income_stability,built_environment,operating_ratio,taxes,bric_social,bric_econ,bric_house,bric_community,bric_institutional,bric_environmental,bric_resilience'];

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
                            + filteredData[0].bric_resilience];

        downloadFile({
        data: [...headers, ...communityCsv].join('\n'),
        fileName: filteredData[0].name + '_' + filteredData[0].stusps + '.csv',
        fileType: 'text/csv',
        });
    };

    return (
        <div className='font-face-gs'>
        <div className='flexbox-container'>
            <Card sx={{ minWidth: 450 }}>
            <CardContent>
                <Typography fontFamily='Gill Sans' sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                    State
                </Typography>
                <Typography fontFamily='Gill Sans' variant="h4" component="div">
                    {filteredData[0] && filteredData[0].stusps}
                </Typography>
            </CardContent>
            </Card>
            <Card sx={{ minWidth: 450 }}>
            <CardContent>
                <Typography fontFamily='Gill Sans' sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                    County
                </Typography>
                <Typography fontFamily='Gill Sans' variant="h4" component="div">
                    {filteredData[0] && filteredData[0].name}
                </Typography>
            </CardContent>
            </Card>
            <Card sx={{ minWidth: 450 }}>
            <CardContent>
                <Typography fontFamily='Gill Sans' sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                    Population
                </Typography>
                <Typography fontFamily='Gill Sans' variant="h4" component="div">
                    {nFormatter(filteredData[0] && filteredData[0].population, 1)}
                </Typography>
            </CardContent>
            </Card>
        </div>
        <div className="cwcs-container">
            <Card sx={{ minWidth: 450 }}>
                <CardContent>
                    <Typography fontFamily='Gill Sans' sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                        CWCS
                    </Typography>
                    <Typography fontFamily='Gill Sans' variant="h4" component="div">
                        {nFormatter(filteredData[0] && filteredData[0].cwcs, 0)}
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
                <Typography fontFamily='Gill Sans' sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                    Public Assistance Obligations
                </Typography>
                <Typography fontFamily='Gill Sans' variant="h5" component="div">
                    ${filteredData[0] && nFormatter(filteredData[0].pa, 2)}
                </Typography>
            </CardContent>
            </Card>
            <Card sx={{ width: 450 }} style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
            <CardContent>
                <Typography fontFamily='Gill Sans' sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                    Hazard Mitigation Obligations
                </Typography>
                <Typography fontFamily='Gill Sans' variant="h5" component="div">
                ${filteredData[0] && nFormatter(filteredData[0].hm, 2)}
                </Typography>
            </CardContent>
            </Card>
            <Card sx={{ width: 450 }} style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
            <CardContent>
                <Typography fontFamily='Gill Sans' sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                    GDP
                </Typography>
                <Typography fontFamily='Gill Sans' variant="h5" component="div">
                    ${filteredData[0] && nFormatter(filteredData[0].gdp * 1000, 2)}
                </Typography>
            </CardContent>
            </Card>
            <Card sx={{ width: 450 }} style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
            <CardContent>
                <Typography fontFamily='Gill Sans' sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                    Taxes
                </Typography>
                <Typography fontFamily='Gill Sans' variant="h5" component="div">
                    ${filteredData[0] && nFormatter(filteredData[0].taxes, 2)}
                </Typography>
            </CardContent>
            </Card>
        </div>
        <div className='flexbox-container-2'>
            <Card sx={{ width: 450 }} style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
            <CardContent>
                <Typography fontFamily='Gill Sans' sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                    Population
                </Typography>
                <Typography fontFamily='Gill Sans' variant="h5" component="div">
                    {filteredData[0] && nFormatter(filteredData[0].population, 2)}
                </Typography>
            </CardContent>
            </Card>
            <Card sx={{ width: 450 }} style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
            <CardContent>
                <Typography fontFamily='Gill Sans' sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                    EM Directors Employment
                </Typography>
                <Typography fontFamily='Gill Sans' variant="h5" component="div">
                    {filteredData[0] && filteredData[0].em_employment}
                </Typography>
            </CardContent>
            </Card>
            <Card sx={{ width: 450 }} style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
            <CardContent>
                <Typography fontFamily='Gill Sans' sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                    Colleges / Universities
                </Typography>
                <Typography fontFamily='Gill Sans' variant="h5" component="div">
                    {filteredData[0] && filteredData[0].college_univ != null ? filteredData[0].college_univ : 0}
                </Typography>
            </CardContent>
            </Card>
        </div>
        <div className='flexbox-container-2'>            
            <Card sx={{ width: 450 }} style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
            <CardContent>
                <Typography fontFamily='Gill Sans' sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                    Major Disaster Declarations
                </Typography>
                <Typography fontFamily='Gill Sans' variant="h5" component="div">
                    {filteredData[0] && filteredData[0].declarations}
                </Typography>
            </CardContent>
            </Card>
            <Card sx={{ width: 450 }} style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
            <CardContent>
                <Typography fontFamily='Gill Sans' sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                    Resistant Commercial Buildings
                </Typography>
                <Typography fontFamily='Gill Sans' variant="h5" component="div">
                    {filteredData[0] && filteredData[0].high_comb_haz_com}%
                </Typography>
            </CardContent>
            </Card>
            <Card sx={{ width: 450 }} style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
            <CardContent>
                <Typography fontFamily='Gill Sans' sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                    National Risk Index
                </Typography>
                <Typography fontFamily='Gill Sans' variant="h5" component="div">
                    {filteredData[0] && nFormatter(filteredData[0].nri, 2)}
                </Typography>
            </CardContent>
            </Card>
            <Card sx={{ width: 450 }} style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
            <CardContent>
                <Typography fontFamily='Gill Sans' sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                    Built Environment
                </Typography>
                <Typography fontFamily='Gill Sans' variant="h5" component="div">
                    {filteredData[0] && nFormatter(filteredData[0].built_environment, 2)}%
                </Typography>
            </CardContent>
            </Card>
        </div>
        {extendedView ? <>
            <div className='flexbox-container-2'>
                <Card sx={{ width: 450 }} style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
                <CardContent>
                    <Typography fontFamily='Gill Sans' sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                        Average Democratic Votes
                    </Typography>
                    <Typography fontFamily='Gill Sans' variant="h5" component="div">
                        {nFormatter(filteredData[0] && filteredData[0].avg_dem_pct, 2)}%
                    </Typography>
                </CardContent>
                </Card>
                <Card sx={{ width: 450 }} style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
                <CardContent>
                    <Typography fontFamily='Gill Sans' sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                    Average Republican Votes
                    </Typography>
                    <Typography fontFamily='Gill Sans' variant="h5" component="div">
                        {nFormatter(filteredData[0] && filteredData[0].avg_rep_pct, 2)}%
                    </Typography>
                </CardContent>
                </Card>
                <Card sx={{ width: 450 }} style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
                <CardContent>
                    <Typography fontFamily='Gill Sans' sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                        Resistant Residential Buildings
                    </Typography>
                    <Typography fontFamily='Gill Sans' variant="h5" component="div">
                        {filteredData[0] && filteredData[0].high_comb_haz_res}%
                    </Typography>
                </CardContent>
                </Card>
                <Card sx={{ width: 450 }} style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
                <CardContent>
                    <Typography fontFamily='Gill Sans' sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                        Broadband Subscription
                    </Typography>
                    <Typography fontFamily='Gill Sans' variant="h5" component="div">
                        {filteredData[0] && nFormatter(filteredData[0].broadband, 2)}%
                    </Typography>
                </CardContent>
                </Card>
            </div>
            <div className='flexbox-container-2'>
                <Card sx={{ width: 450 }} style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
                <CardContent>
                    <Typography fontFamily='Gill Sans' sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                        Hazard Mitigation Plan Status
                    </Typography>
                    <Typography fontFamily='Gill Sans' variant="h5" component="div">
                        {filteredData[0] && filteredData[0].hm_plan_status}
                    </Typography>
                </CardContent>
                </Card>
                <Card sx={{ width: 450 }} style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
                <CardContent>
                    <Typography fontFamily='Gill Sans' sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                        CDC Social Vulnerability Index
                    </Typography>
                    <Typography fontFamily='Gill Sans' variant="h5" component="div">
                        {filteredData[0] && filteredData[0].cdc_svi}
                    </Typography>
                </CardContent>
                </Card>
                <Card sx={{ width: 450 }} style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
                <CardContent>
                    <Typography fontFamily='Gill Sans' sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                        HVRI Social Responsibility Index
                    </Typography>
                    <Typography fontFamily='Gill Sans' variant="h5" component="div">
                        {filteredData[0] && filteredData[0].hvri_sovi}
                    </Typography>
                </CardContent>
                </Card>
            </div>
            <div className='flexbox-container-2'>
                <Card sx={{ width: 450 }} style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
                <CardContent>
                    <Typography fontFamily='Gill Sans' sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                        Operating Ratio
                    </Typography>
                    <Typography fontFamily='Gill Sans' variant="h5" component="div">
                        {filteredData[0] && nFormatter(filteredData[0].operating_ratio, 2)}
                    </Typography>
                </CardContent>
                </Card>
                <Card sx={{ width: 450 }} style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
                <CardContent>
                    <Typography fontFamily='Gill Sans' sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                        EM Directors Employment / 1000 Jobs
                    </Typography>
                    <Typography fontFamily='Gill Sans' variant="h5" component="div">
                    {filteredData[0] && filteredData[0].em_employment_per}
                    </Typography>
                </CardContent>
                </Card>
                <Card sx={{ width: 450 }} style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
                <CardContent>
                    <Typography fontFamily='Gill Sans' sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                        EM Directors Location Quotient
                    </Typography>
                    <Typography fontFamily='Gill Sans' variant="h5" component="div">
                    {filteredData[0] && filteredData[0].em_lq}
                    </Typography>
                </CardContent>
                </Card>
            </div>
            <div className='flexbox-container-2'>
                <Card sx={{ width: 450 }} style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
                <CardContent>
                    <Typography fontFamily='Gill Sans' sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                        NCHS Urban-Rural Classification Scheme
                    </Typography>
                    <Typography fontFamily='Gill Sans' variant="h5" component="div">
                        {filteredData[0] && filteredData[0].urban_rural}
                    </Typography>
                </CardContent>
                </Card>
                <Card sx={{ width: 450 }} style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
                <CardContent>
                    <Typography fontFamily='Gill Sans' sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                        Higher Education
                    </Typography>
                    <Typography fontFamily='Gill Sans' variant="h5" component="div">
                        {filteredData[0] && nFormatter(filteredData[0].higher_ed, 2)}%
                    </Typography>
                </CardContent>
                </Card>
                <Card sx={{ width: 450 }} style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
                <CardContent>
                    <Typography fontFamily='Gill Sans' sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                        Above Poverty Line
                    </Typography>
                    <Typography fontFamily='Gill Sans' variant="h5" component="div">
                        {filteredData[0] && nFormatter(filteredData[0].poverty, 2)}%
                    </Typography>
                </CardContent>
                </Card>
            </div>
            <div className='flexbox-container-2'>
                <Card sx={{ width: 450 }} style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
                <CardContent>
                    <Typography fontFamily='Gill Sans' sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                        Health Insurance
                    </Typography>
                    <Typography fontFamily='Gill Sans' variant="h5" component="div">
                        {filteredData[0] && nFormatter(filteredData[0].health_insurance, 2)}%
                    </Typography>
                </CardContent>
                </Card>
                <Card sx={{ width: 450 }} style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
                <CardContent>
                    <Typography fontFamily='Gill Sans' sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                        Voter Turnout (2020)
                    </Typography>
                    <Typography fontFamily='Gill Sans' variant="h5" component="div">
                        {filteredData[0] && nFormatter(filteredData[0].voter_turn, 2)}%
                    </Typography>
                </CardContent>
                </Card>
                <Card sx={{ width: 450 }} style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
                <CardContent>
                    <Typography fontFamily='Gill Sans' sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                        Population Change (2010-2020)
                    </Typography>
                    <Typography fontFamily='Gill Sans' variant="h5" component="div">
                        {filteredData[0] && nFormatter(filteredData[0].pop_change, 2)}%
                    </Typography>
                </CardContent>
                </Card>
                <Card sx={{ width: 450 }} style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
                <CardContent>
                    <Typography fontFamily='Gill Sans' sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                        Income Stability
                    </Typography>
                    <Typography fontFamily='Gill Sans' variant="h5" component="div">
                        {filteredData[0] && filteredData[0].income_stability}
                    </Typography>
                </CardContent>
                </Card>
            </div>
            <div className='flexbox-container-2'>
                <Card sx={{ width: 450 }} style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
                <CardContent>
                    <Typography fontFamily='Gill Sans' sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                        BRIC Social Sub-Index Score
                    </Typography>
                    <Typography fontFamily='Gill Sans' variant="h5" component="div">
                        {filteredData[0] && filteredData[0].bric_social}
                    </Typography>
                </CardContent>
                </Card>
                <Card sx={{ width: 450 }} style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
                <CardContent>
                    <Typography fontFamily='Gill Sans' sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                        BRIC Economic Sub-Index Score
                    </Typography>
                    <Typography fontFamily='Gill Sans' variant="h5" component="div">
                        {filteredData[0] && filteredData[0].bric_econ}
                    </Typography>
                </CardContent>
                </Card>
                <Card sx={{ width: 450 }} style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
                <CardContent>
                    <Typography fontFamily='Gill Sans' sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                        BRIC Housing/Infrastructure Sub-Index Score
                    </Typography>
                    <Typography fontFamily='Gill Sans' variant="h5" component="div">
                        {filteredData[0] && filteredData[0].bric_house}
                    </Typography>
                </CardContent>
                </Card>
                <Card sx={{ width: 450 }} style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
                <CardContent>
                    <Typography fontFamily='Gill Sans' sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                        BRIC Community Capital Sub-Index Score
                    </Typography>
                    <Typography fontFamily='Gill Sans' variant="h5" component="div">
                        {filteredData[0] && filteredData[0].bric_community}
                    </Typography>
                </CardContent>
                </Card>
            </div>
            <div className='flexbox-container-2'>
                <Card sx={{ width: 450 }} style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
                <CardContent>
                    <Typography fontFamily='Gill Sans' sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                        BRIC Institutional Sub-Index Score
                    </Typography>
                    <Typography fontFamily='Gill Sans' variant="h5" component="div">
                        {filteredData[0] && filteredData[0].bric_institutional}
                    </Typography>
                </CardContent>
                </Card>
                <Card sx={{ width: 450 }} style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
                <CardContent>
                    <Typography fontFamily='Gill Sans' sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                        BRIC Environmental Sub-Index Score
                    </Typography>
                    <Typography fontFamily='Gill Sans' variant="h5" component="div">
                        {filteredData[0] && filteredData[0].bric_environmental}
                    </Typography>
                </CardContent>
                </Card>
                <Card sx={{ width: 450 }} style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
                <CardContent>
                    <Typography fontFamily='Gill Sans' sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                        BRIC Resilience Score
                    </Typography>
                    <Typography fontFamily='Gill Sans' variant="h5" component="div">
                        {filteredData[0] && filteredData[0].bric_resilience}
                    </Typography>
                </CardContent>
                </Card>
            </div>
        </>
        : null
        }
        <div className="d-flex justify-content-center align-items-center">
            <div style={buttonStyle}>
                {
                    extendedView ?
                    <Button variant="outline-secondary" type="submit" onClick={() => setExtendedView(false)}>
                        Top Factors View
                    </Button> :
                    <Button variant="outline-secondary" type="submit" onClick={() => setExtendedView(true)}>
                        Extended View
                    </Button>
                }
            </div>
        </div>
        <div className='flexbox-container'>
            <div style={buttonStyle}>
                <Button variant="outline-secondary" type="submit" onClick={() => navigate("/communitySearch", { replace: true })}>
                    Back to Search
                </Button>
            </div>
            <div style={buttonStyle}>
                <Button variant="outline-secondary" type="submit" onClick={() => navigate(`/communityCompareSearch/${filteredData[0].serial_number}`, { replace: true })}>
                    Compare Communities
                </Button>
            </div>
            <div style={buttonStyle}>
                <Button variant="outline-secondary" type="submit" onClick={() => navigate(`/visualizeData/${sno}`, { replace: true })}>
                    Visualize Data
                </Button>
            </div>
            <div style={buttonStyle}>
                <Button variant="outline-secondary" type="submit" onClick={() => navigate(`/communityCompareSearch/${filteredData[0].serial_number}`, { replace: true })}>
                    Compare Communities
                </Button>
            </div>
            <div style={buttonStyle}>
                <Button variant="outline-secondary" type="submit" onClick={handleDelete}>
                    Delete this Community
                </Button>
            </div>
            <div style={buttonStyle}>
                <Button variant="outline-secondary" type="submit" onClick={() => navigate(`/editCommunityDetails/${filteredData[0].serial_number}`, { replace: true })}>
                    Edit Data
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