import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
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
        <Table className='table'>
            <tbody>
                <tr>
                    <td>Public Assistance Obligations</td>
                    <td>${filteredData[0] && nFormatter(filteredData[0].pa, 2)}</td>
                </tr>
                <tr>
                    <td>Hazard Mitigation Obligations</td>
                    <td>${filteredData[0] && nFormatter(filteredData[0].hm, 2)}</td>
                </tr>
                <tr>
                    <td>GDP</td>
                    <td>${filteredData[0] && nFormatter(filteredData[0].gdp * 1000, 2)}</td>
                </tr>
                <tr>
                    <td>Taxes</td>
                    <td>${filteredData[0] && nFormatter(filteredData[0].taxes, 2)}</td>
                </tr>
                <tr>
                    <td>Population</td>
                    <td>{filteredData[0] && nFormatter(filteredData[0].population, 2)}</td>
                </tr>
                <tr>
                    <td>EM Directors Employment</td>
                    <td>{filteredData[0] && nFormatter(filteredData[0].em_employment, 2)}</td>
                </tr>
                <tr>
                    <td>Colleges / Universities</td>
                    <td>{filteredData[0] && nFormatter(filteredData[0].college_univ, 2)}</td>
                </tr>
                <tr>
                    <td>Major Disaster Declarations</td>
                    <td>{filteredData[0] && nFormatter(filteredData[0].declarations, 2)}</td>
                </tr>
                <tr>
                    <td>Resistant Commercial Buildings</td>
                    <td>{filteredData[0] && filteredData[0].high_comb_haz_com}%</td>
                </tr>
                <tr>
                    <td>National Risk Index</td>
                    <td>{filteredData[0] && nFormatter(filteredData[0].nri, 2)}</td>
                </tr>
                <tr>
                    <td>Built Environment</td>
                    <td>{filteredData[0] && nFormatter(filteredData[0].built_environment, 2)}%</td>
                </tr>
                {extendedView ? <>
                <tr>
                    <td>Average Democratic Percentage</td>
                    <td>{filteredData[0] && nFormatter(filteredData[0].avg_dem_pct, 2)}%</td>
                </tr>
                <tr>
                    <td>Average Republican Percentage</td>
                    <td>{filteredData[0] && nFormatter(filteredData[0].avg_rep_pct, 2)}%</td>
                </tr>
                <tr>
                    <td>Resistant Residential Buildings</td>
                    <td>{filteredData[0] && nFormatter(filteredData[0].high_comb_haz_res, 2)}%</td>
                </tr>
                <tr>
                    <td>Hazard Mitigation Plan Status</td>
                    <td>{filteredData[0] && filteredData[0].hm_plan_status}</td>
                </tr>
                <tr>
                    <td>CDC Social Vulnerability Index</td>
                    <td>{filteredData[0] && filteredData[0].cdc_svi}</td>
                </tr>
                <tr>
                    <td>HVRI Social Responsibility Index</td>
                    <td>{filteredData[0] && filteredData[0].hvri_sovi}</td>
                </tr>
                <tr>
                    <td>Operating Ratio</td>
                    <td>{filteredData[0] && nFormatter(filteredData[0].operating_ratio, 2)}</td>
                </tr>
                <tr>
                    <td>EM Directors Employment / 100 Jobs</td>
                    <td>{filteredData[0] && filteredData[0].em_employment_per}</td>
                </tr>
                <tr>
                    <td>EM Directors Location Quotient</td>
                    <td>{filteredData[0] && filteredData[0].em_lq}</td>
                </tr>
                <tr>
                    <td>NCHS Urban-Rural Classification Scheme</td>
                    <td>{filteredData[0] && filteredData[0].urban_rural}</td>
                </tr>
                <tr>
                    <td>Higher Education</td>
                    <td>{filteredData[0] && nFormatter(filteredData[0].higher_ed, 2)}%</td>
                </tr>
                <tr>
                    <td>Health Insurance</td>
                    <td>{filteredData[0] && nFormatter(filteredData[0].health_insurance, 2)}%</td>
                </tr>
                <tr>
                    <td>Voter Turnout (2020)</td>
                    <td>{filteredData[0] && nFormatter(filteredData[0].voter_turn, 2)}%</td>
                </tr>
                <tr>
                    <td>Above Poverty Line</td>
                    <td>{filteredData[0] && nFormatter(filteredData[0].pop_change, 2)}%</td>
                </tr>
                <tr>
                    <td>Population Change (2010-2020)</td>
                    <td>{filteredData[0] && nFormatter(filteredData[0].poverty, 2)}%</td>
                </tr>
                <tr>
                    <td>Income Stability</td>
                    <td>{filteredData[0] && filteredData[0].income_stability}</td>
                </tr>
                <tr>
                    <td>Broadband Subscription</td>
                    <td>{filteredData[0] && nFormatter(filteredData[0].broadband, 2)}%</td>
                </tr>
                <tr>
                    <td>BRIC Social Sub-Index Score</td>
                    <td>{filteredData[0] && filteredData[0].bric_social}</td>
                </tr>
                <tr>
                    <td>BRIC Economic Sub-Index Score</td>
                    <td>{filteredData[0] && filteredData[0].bric_econ}</td>
                </tr>
                <tr>
                    <td>BRIC Housing/Infrastructure Sub-Index Score</td>
                    <td>{filteredData[0] && filteredData[0].bric_house}</td>
                </tr>
                <tr>
                    <td>BRIC Community Capital Sub-Index Score</td>
                    <td>{filteredData[0] && filteredData[0].bric_community}</td>
                </tr>
                <tr>
                    <td>BRIC Institutional Sub-Index Score</td>
                    <td>{filteredData[0] && filteredData[0].bric_institutional}</td>
                </tr>
                <tr>
                    <td>BRIC Environmental Sub-Index Score</td>
                    <td>{filteredData[0] && filteredData[0].bric_environmental}</td>
                </tr>
                <tr>
                    <td>BRIC Resilience Score</td>
                    <td>{filteredData[0] && filteredData[0].bric_resilience}</td>
                </tr>
                </> : null}
            </tbody>
        </Table>
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