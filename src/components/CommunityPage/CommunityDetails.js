import React, { useEffect, useState } from 'react';
import { Button, Table, OverlayTrigger, Tooltip, Modal } from 'react-bootstrap';
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
    if (num === 0 || num == null) return "0";
    const lookup = [
        { value: 1, symbol: "" },
        { value: 1e3, symbol: "K" },
        { value: 1e6, symbol: "M" },
        { value: 1e9, symbol: "B" }
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookup.slice().reverse().find(function(item) {
        return num >= item.value;
    });
    if (Math.abs(num) < 1e-2) {
        const exponent = Math.floor(Math.log10(Math.abs(num)));
        const mantissa = (num * Math.pow(10, -exponent)).toFixed(digits);
        return mantissa + "E" + exponent;
    } else if (Math.abs(num) < 1 && Math.abs(num) > 0) {
        return num.toFixed(digits).replace(rx, "$1");
    }
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
        data: JSON.stringify(filteredData),
        fileName: filteredData.name + '_' + filteredData.stusps + '.json',
        fileType: 'text/json',
        });
    };

    const exportToCsv = e => {
        e.preventDefault();

        // Headers for each column
        let headers = ['name,stusps,cwcs,population,gdp,avg_dem_pct,avg_rep_pct,declarations,hm,pa,hm_plan_status,nri,cdc_svi,hvri_sovi,high_comb_haz_com,high_comb_haz_res,em_employment,em_employment_per,em_lq,urban_rural,college_univ,higher_ed,poverty,broadband,health_insurance,voter_turn,pop_change,income_stability,built_environment,operating_ratio,taxes,bric_social,bric_econ,bric_house,bric_community,bric_institutional,bric_environmental,bric_resilience'];

        // Convert users data to a csv
        let communityCsv = [filteredData.name + ','
                            + filteredData.stusps + ','
                            + filteredData.cwcs + ','
                            + filteredData.population + ','
                            + filteredData.gdp + ','
                            + filteredData.avg_dem_pct + ','
                            + filteredData.avg_rep_pct + ','
                            + filteredData.declarations + ','
                            + filteredData.hm + ','
                            + filteredData.pa + ','
                            + filteredData.hm_plan_status + ','
                            + filteredData.nri + ','
                            + filteredData.cdc_svi + ','
                            + filteredData.hvri_sovi + ','
                            + filteredData.high_comb_haz_com + ','
                            + filteredData.high_comb_haz_res + ','
                            + filteredData.em_employment + ','
                            + filteredData.em_employment_per + ','
                            + filteredData.em_lq + ','
                            + filteredData.urban_rural + ','
                            + filteredData.college_univ + ','
                            + filteredData.higher_ed + ','
                            + filteredData.poverty + ','
                            + filteredData.broadband + ','
                            + filteredData.health_insurance + ','
                            + filteredData.voter_turn + ','
                            + filteredData.pop_change + ','
                            + filteredData.income_stability + ','
                            + filteredData.built_environment + ','
                            + filteredData.operating_ratio + ','
                            + filteredData.taxes + ','
                            + filteredData.bric_social + ','
                            + filteredData.bric_econ + ','
                            + filteredData.bric_house + ','
                            + filteredData.bric_community + ','
                            + filteredData.bric_institutional + ','
                            + filteredData.bric_environmental + ','
                            + filteredData.bric_resilience];

        downloadFile({
        data: [...headers, ...communityCsv].join('\n'),
        fileName: filteredData.name + '_' + filteredData.stusps + '.csv',
        fileType: 'text/csv',
        });
    };
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
    setOpen(true);
    };

    const handleClose = () => {
    setOpen(false);
    };

    const cwcs = filteredData && filteredData.cwcs;

    return (
        <div className='font-face-gs'>
        <div className='flexbox-container'>
            <Card sx={{ minWidth: 450 }}>
            <CardContent>
                <Typography fontFamily='Gill Sans' sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                    State
                </Typography>
                <Typography fontFamily='Gill Sans' variant="h4" component="div">
                    {filteredData && filteredData.stusps}
                </Typography>
            </CardContent>
            </Card>
            <Card sx={{ minWidth: 450 }}>
            <CardContent>
                <Typography fontFamily='Gill Sans' sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                    County
                </Typography>
                <Typography fontFamily='Gill Sans' variant="h4" component="div">
                    {filteredData && filteredData.name}
                </Typography>
            </CardContent>
            </Card>
            <Card sx={{ minWidth: 450 }}>
            <CardContent>
                <Typography fontFamily='Gill Sans' sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                    Population
                </Typography>
                <Typography fontFamily='Gill Sans' variant="h4" component="div">
                    {nFormatter(filteredData && filteredData.population, 1)}
                </Typography>
            </CardContent>
            </Card>
        </div>
        <div className="cwcs-container">
        <Card sx={{ minWidth: 450 }}>
            <CardContent>
                <Typography fontFamily='Gill Sans' sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                    CWCS
                    <OverlayTrigger
                        placement="right"
                        overlay={<Tooltip>Click for more information</Tooltip>}
                    >
                        <Button variant="link" onClick={handleOpen}>
                        ⓘ
                        </Button>
                    </OverlayTrigger>
                </Typography>
                <Typography fontFamily='Gill Sans' variant="h4" component="div">
                    {filteredData && filteredData.cwcs}
                </Typography>
            </CardContent>
            </Card>
            <Modal show={open} onHide={handleClose} centered>
                <Modal.Header closeButton>
                <Modal.Title>CWCS Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Community Willingness & Capability Score: This score is generated using 4 main factors which have the most correlation:</p>
                    <ul><li>Hazard Mitigation Obligation (20%)</li>
                    <li>Public Assistance Obligation (20%)</li>
                    <li>Ratio of Total Revenues to Total Expenses (30%)</li>
                    <li>Number of Federally Declared Major Disaster Declarations - 2003 to Present (30%)</li></ul>
                    <p>We then use predictive machine learning modeling to generate the scores for the communities. This is a score you can use to quantify the suitability of a region to receive disaster relief funding.</p>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
        <div className='factors'>
            <h3>Backing Data</h3>
        </div>
        <Table className='table'>
            <tbody>
                <tr>
                    <td>Public Assistance Obligations</td>
                    <td>${filteredData && nFormatter(filteredData.pa, 2)}</td>
                </tr>
                <tr>
                    <td>Hazard Mitigation Obligations</td>
                    <td>${filteredData && nFormatter(filteredData.hm, 2)}</td>
                </tr>
                <tr>
                    <td>GDP</td>
                    <td>${filteredData && nFormatter(filteredData.gdp * 1000, 2)}</td>
                </tr>
                <tr>
                    <td>Taxes</td>
                    <td>${filteredData && nFormatter(filteredData.taxes, 2)}</td>
                </tr>
                <tr>
                    <td>Population</td>
                    <td>{filteredData && nFormatter(filteredData.population, 2)}</td>
                </tr>
                <tr>
                    <td>EM Directors Employment</td>
                    <td>{filteredData && nFormatter(filteredData.em_employment, 2)}</td>
                </tr>
                <tr>
                    <td>Colleges / Universities</td>
                    <td>{filteredData && nFormatter(filteredData.college_univ, 2)}</td>
                </tr>
                <tr>
                    <td>Major Disaster Declarations</td>
                    <td>{filteredData && nFormatter(filteredData.declarations, 2)}</td>
                </tr>
                <tr>
                    <td>Resistant Commercial Buildings</td>
                    <td>{filteredData && nFormatter(filteredData.high_comb_haz_com, 2)}%</td>
                </tr>
                <tr>
                    <td>National Risk Index</td>
                    <td>{filteredData && nFormatter(filteredData.nri, 2)}</td>
                </tr>
                <tr>
                    <td>Built Environment</td>
                    <td>{filteredData && nFormatter(filteredData.built_environment, 2)}%</td>
                </tr>
                {extendedView ? <>
                <tr>
                    <td>Average Democratic Percentage</td>
                    <td>{filteredData && nFormatter(filteredData.avg_dem_pct, 2)}%</td>
                </tr>
                <tr>
                    <td>Average Republican Percentage</td>
                    <td>{filteredData && nFormatter(filteredData.avg_rep_pct, 2)}%</td>
                </tr>
                <tr>
                    <td>Resistant Residential Buildings</td>
                    <td>{filteredData && nFormatter(filteredData.high_comb_haz_res, 2)}%</td>
                </tr>
                <tr>
                    <td>Hazard Mitigation Plan Status</td>
                    <td>{filteredData && filteredData.hm_plan_status}</td>
                </tr>
                <tr>
                    <td>CDC Social Vulnerability Index</td>
                    <td>{filteredData && filteredData.cdc_svi}</td>
                </tr>
                <tr>
                    <td>HVRI Social Responsibility Index</td>
                    <td>{filteredData && filteredData.hvri_sovi}</td>
                </tr>
                <tr>
                    <td>Operating Ratio</td>
                    <td>{filteredData && nFormatter(filteredData.operating_ratio, 2)}</td>
                </tr>
                <tr>
                    <td>EM Directors Employment / 100 Jobs</td>
                    <td>{filteredData && filteredData.em_employment_per}</td>
                </tr>
                <tr>
                    <td>EM Directors Location Quotient</td>
                    <td>{filteredData && filteredData.em_lq}</td>
                </tr>
                <tr>
                    <td>NCHS Urban-Rural Classification Scheme</td>
                    <td>{filteredData && filteredData.urban_rural}</td>
                </tr>
                <tr>
                    <td>Higher Education</td>
                    <td>{filteredData && nFormatter(filteredData.higher_ed, 2)}%</td>
                </tr>
                <tr>
                    <td>Health Insurance</td>
                    <td>{filteredData && nFormatter(filteredData.health_insurance, 2)}%</td>
                </tr>
                <tr>
                    <td>Voter Turnout (2020)</td>
                    <td>{filteredData && nFormatter(filteredData.voter_turn, 2)}%</td>
                </tr>
                <tr>
                    <td>Above Poverty Line</td>
                    <td>{filteredData && nFormatter(filteredData.poverty, 2)}%</td>
                </tr>
                <tr>
                    <td>Population Change (2010-2020)</td>
                    <td>{filteredData && nFormatter(filteredData.pop_change, 2)}%</td>
                </tr>
                <tr>
                    <td>Income Stability</td>
                    <td>{filteredData && nFormatter(filteredData.income_stability, 2)}</td>
                </tr>
                <tr>
                    <td>Broadband Subscription</td>
                    <td>{filteredData && nFormatter(filteredData.broadband, 2)}%</td>
                </tr>
                <tr>
                    <td>BRIC Social Sub-Index Score</td>
                    <td>{filteredData && nFormatter(filteredData.bric_social, 2)}</td>
                </tr>
                <tr>
                    <td>BRIC Economic Sub-Index Score</td>
                    <td>{filteredData && nFormatter(filteredData.bric_econ, 2)}</td>
                </tr>
                <tr>
                    <td>BRIC Housing/Infrastructure Sub-Index Score</td>
                    <td>{filteredData && nFormatter(filteredData.bric_house, 2)}</td>
                </tr>
                <tr>
                    <td>BRIC Community Capital Sub-Index Score</td>
                    <td>{filteredData && nFormatter(filteredData.bric_community, 2)}</td>
                </tr>
                <tr>
                    <td>BRIC Institutional Sub-Index Score</td>
                    <td>{filteredData && nFormatter(filteredData.bric_institutional, 2)}</td>
                </tr>
                <tr>
                    <td>BRIC Environmental Sub-Index Score</td>
                    <td>{filteredData && nFormatter(filteredData.bric_environmental, 2)}</td>
                </tr>
                <tr>
                    <td>BRIC Resilience Score</td>
                    <td>{filteredData && nFormatter(filteredData.bric_resilience, 2)}</td>
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
                <Button variant="outline-secondary" type="submit" onClick={() => navigate(`/communityCompareSearch/${filteredData.serial_number}`, { replace: true })}>
                    Compare Communities
                </Button>
            </div>
            <div style={buttonStyle}>
                <Button variant="outline-secondary" type="submit" onClick={() => navigate(`/visualizeData/${sno}`, { replace: true })}>
                    Visualize Data
                </Button>
            </div>
            <div style={buttonStyle}>
                <Button variant="outline-secondary" type="submit" onClick={handleDelete}>
                    Delete this Community
                </Button>
            </div>
            <div style={buttonStyle}>
                <Button variant="outline-secondary" type="submit" onClick={() => navigate(`/editCommunityDetails/${filteredData.serial_number}`, { replace: true })}>
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