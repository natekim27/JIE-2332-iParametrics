import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import './CommunityComparePage.css';

const buttonStyle = {
  marginTop: 0,
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

const CommunityCompareDetails = () => {
    const navigate = useNavigate();
    const { sno1, sno2 } = useParams();
    const [community1, setCommunity1] = useState(null);
    const [community2, setCommunity2] = useState(null);
    const [message, setMessage] = useState("");
    const [extendedView, setExtendedView] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response1 = await fetch(`http://127.0.0.1:5000/features/get-by-sno?sno=${sno1}`, {
                    method: "GET",
                });
                const data1 = await response1.json();
                setCommunity1(data1);

                const response2 = await fetch(`http://127.0.0.1:5000/features/get-by-sno?sno=${sno2}`, {
                    method: "GET",
                });
                const data2 = await response2.json();
                setCommunity2(data2);
            } catch (err) {
                console.log(err.message);
                setMessage(err.message);
            }
        };

        fetchData();
    }, [sno1, sno2]);

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
        data: "{" + JSON.stringify(community1) + "," + JSON.stringify(community2) + "}",
        fileName: community1.name + '_' + community1.stusps + '_' + community2.name + '_' + community2.stusps + '.json',
        fileType: 'text/json',
        });
    };

    const exportToCsv = e => {
        e.preventDefault();

        // Headers for each column
        let headers = ['name,stusps,cwcs,population,gdp,avg_dem_pct,avg_rep_pct,declarations,hm,pa,hm_plan_status,nri,cdc_svi,hvri_sovi,high_comb_haz_com,high_comb_haz_res,em_employment,em_employment_per,em_lq,urban_rural,college_univ,higher_ed,poverty,broadband,health_insurance,voter_turn,pop_change,income_stability,built_environment,operating_ratio,taxes,bric_social,bric_econ,bric_house,bric_community,bric_institutional,bric_environmental,bric_resilience'];

        // Convert users data to a csv
        let community1Csv = [community1.name + ','
                            + community1.stusps + ','
                            + community1.cwcs + ','
                            + community1.population + ','
                            + community1.gdp + ','
                            + community1.avg_dem_pct + ','
                            + community1.avg_rep_pct + ','
                            + community1.declarations + ','
                            + community1.hm + ','
                            + community1.pa + ','
                            + community1.hm_plan_status + ','
                            + community1.nri + ','
                            + community1.cdc_svi + ','
                            + community1.hvri_sovi + ','
                            + community1.high_comb_haz_com + ','
                            + community1.high_comb_haz_res + ','
                            + community1.em_employment + ','
                            + community1.em_employment_per + ','
                            + community1.em_lq + ','
                            + community1.urban_rural + ','
                            + community1.college_univ + ','
                            + community1.higher_ed + ','
                            + community1.poverty + ','
                            + community1.broadband + ','
                            + community1.health_insurance + ','
                            + community1.voter_turn + ','
                            + community1.pop_change + ','
                            + community1.income_stability + ','
                            + community1.built_environment + ','
                            + community1.operating_ratio + ','
                            + community1.taxes + ','
                            + community1.bric_social + ','
                            + community1.bric_econ + ','
                            + community1.bric_house + ','
                            + community1.bric_community + ','
                            + community1.bric_institutional + ','
                            + community1.bric_environmental + ','
                            + community1.bric_resilience];

        let community2Csv = [community2.name + ','
                            + community2.stusps + ','
                            + community2.cwcs + ','
                            + community2.population + ','
                            + community2.gdp + ','
                            + community2.avg_dem_pct + ','
                            + community2.avg_rep_pct + ','
                            + community2.declarations + ','
                            + community2.hm + ','
                            + community2.pa + ','
                            + community2.hm_plan_status + ','
                            + community2.nri + ','
                            + community2.cdc_svi + ','
                            + community2.hvri_sovi + ','
                            + community2.high_comb_haz_com + ','
                            + community2.high_comb_haz_res + ','
                            + community2.em_employment + ','
                            + community2.em_employment_per + ','
                            + community2.em_lq + ','
                            + community2.urban_rural + ','
                            + community2.college_univ + ','
                            + community2.higher_ed + ','
                            + community2.poverty + ','
                            + community2.broadband + ','
                            + community2.health_insurance + ','
                            + community2.voter_turn + ','
                            + community2.pop_change + ','
                            + community2.income_stability + ','
                            + community2.built_environment + ','
                            + community2.operating_ratio + ','
                            + community2.taxes + ','
                            + community2.bric_social + ','
                            + community2.bric_econ + ','
                            + community2.bric_house + ','
                            + community2.bric_community + ','
                            + community2.bric_institutional + ','
                            + community2.bric_environmental + ','
                            + community2.bric_resilience];

        downloadFile({
            data: [...headers, ...community1Csv, ...community2Csv].join('\n'),
            fileName: community1.name + '_' + community1.stusps + '_' + community2.name + '_' + community2.stusps + '.csv',
            fileType: 'text/csv',
        });
    };

    console.log(community1);

    return (
        <div className='font-face-gs'>
            <h4>{community1 && community1.name}, {community1 && community1.stusps} and {community2 && community2.name}, {community2 && community2.stusps}</h4>
            <Table className='table'>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Factor</th>
                        <th>{community1 && community1.name}</th>
                        <th>{community2 && community2.name}</th>
                    </tr>
                    <tr>
                        <th></th>
                        <th>CWCS</th>
                        <th>{community1 && community1.cwcs}</th>
                        <th>{community2 && community2.cwcs}</th>
                    </tr>
                </thead>
                <tbody>
                <tr>
                    <td>1</td>
                    <td>Public Assistance Obligations</td>
                    <td>${community1 && nFormatter(community1.pa, 2)}</td>
                    <td>${community2 && nFormatter(community2.pa, 2)}</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Hazard Mitigation Obligations</td>
                    <td>${community1 && nFormatter(community1.hm, 2)}</td>
                    <td>${community2 && nFormatter(community2.hm, 2)}</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>GDP</td>
                    <td>${community1 && nFormatter(community1.gdp * 1000, 2)}</td>
                    <td>${community2 && nFormatter(community2.gdp * 1000, 2)}</td>
                </tr>
                <tr>
                    <td>4</td>
                    <td>Taxes</td>
                    <td>${community1 && nFormatter(community1.taxes, 2)}</td>
                    <td>${community2 && nFormatter(community2.taxes, 2)}</td>
                </tr>
                <tr>
                    <td>5</td>
                    <td>Population</td>
                    <td>{community1 && nFormatter(community1.population, 2)}</td>
                    <td>{community2 && nFormatter(community2.population, 2)}</td>
                </tr>
                <tr>
                    <td>6</td>
                    <td>EM Directors Employment</td>
                    <td>{community1 && nFormatter(community1.em_employment, 2)}</td>
                    <td>{community2 && nFormatter(community2.em_employment, 2)}</td>
                </tr>
                <tr>
                    <td>7</td>
                    <td>Major Disaster Declarations</td>
                    <td>{community1 && nFormatter(community1.declarations, 2)}</td>
                    <td>{community2 && nFormatter(community2.declarations, 2)}</td>
                </tr>
                <tr>
                    <td>8</td>
                    <td>Resistant Commercial Buildings</td>
                    <td>{community1 && nFormatter(community1.high_comb_haz_com, 2)}%</td>
                    <td>{community2 && nFormatter(community2.high_comb_haz_com, 2)}%</td>
                </tr>
                <tr>
                    <td>9</td>
                    <td>Resistant Residential Buildings</td>
                    <td>{community1 && nFormatter(community1.high_comb_haz_res, 2)}%</td>
                    <td>{community2 && nFormatter(community2.high_comb_haz_res, 2)}%</td>
                </tr>
                <tr>
                    <td>10</td>
                    <td>National Risk Index</td>
                    <td>{community1 && nFormatter(community1.nri, 2)}</td>
                    <td>{community2 && nFormatter(community2.nri, 2)}</td>
                </tr>
                <tr>
                    <td>11</td>
                    <td>Colleges / Universities</td>
                    <td>{community1 && nFormatter(community1.college_univ, 2)}</td>
                    <td>{community2 && nFormatter(community2.college_univ, 2)}</td>
                </tr>
                {extendedView ? <>
                <tr>
                    <td>12</td>
                    <td>Voter Turnout (2020)</td>
                    <td>{community1 && nFormatter(community1.voter_turn, 2)}%</td>
                    <td>{community2 && nFormatter(community2.voter_turn, 2)}%</td>
                </tr>
                <tr>
                    <td>13</td>
                    <td>Average Republican Percentage</td>
                    <td>{community1 && nFormatter(community1.avg_rep_pct, 2)}%</td>
                    <td>{community2 && nFormatter(community2.avg_rep_pct, 2)}%</td>
                </tr>
                <tr>
                    <td>14</td>
                    <td>Built Environment</td>
                    <td>{community1 && nFormatter(community1.built_environment, 2)}%</td>
                    <td>{community2 && nFormatter(community2.built_environment, 2)}%</td>
                </tr>
                <tr>
                    <td>15</td>
                    <td>Average Democratic Percentage</td>
                    <td>{community1 && nFormatter(community1.avg_dem_pct, 2)}%</td>
                    <td>{community2 && nFormatter(community2.avg_dem_pct, 2)}%</td>
                </tr>
                <tr>
                    <td>16</td>
                    <td>EM Directors Location Quotient</td>
                    <td>{community1 && community1.em_lq}</td>
                    <td>{community2 && community2.em_lq}</td>
                </tr>
                <tr>
                    <td>17</td>
                    <td>Higher Education</td>
                    <td>{community1 && nFormatter(community1.higher_ed, 2)}%</td>
                    <td>{community2 && nFormatter(community2.higher_ed, 2)}%</td>
                </tr>
                <tr>
                    <td>18</td>
                    <td>Broadband Subscription</td>
                    <td>{community1 && nFormatter(community1.broadband, 2)}%</td>
                    <td>{community2 && nFormatter(community2.broadband, 2)}%</td>
                </tr>
                <tr>
                    <td>19</td>
                    <td>Above Poverty Line</td>
                    <td>{community1 && nFormatter(community1.poverty, 2)}%</td>
                    <td>{community2 && nFormatter(community2.poverty, 2)}%</td>
                </tr>
                <tr>
                    <td>20</td>
                    <td>EM Directors Employment / 100 Jobs</td>
                    <td>{community1 && community1.em_employment_per}</td>
                    <td>{community2 && community2.em_employment_per}</td>
                </tr>
                <tr>
                    <td>21</td>
                    <td>Health Insurance</td>
                    <td>{community1 && nFormatter(community1.health_insurance, 2)}%</td>
                    <td>{community2 && nFormatter(community2.health_insurance, 2)}%</td>
                </tr>
                <tr>
                    <td>22</td>
                    <td>Operating Ratio</td>
                    <td>{community1 && nFormatter(community1.operating_ratio, 2)}</td>
                    <td>{community2 && nFormatter(community2.operating_ratio, 2)}</td>
                </tr>
                <tr>
                    <td>23</td>
                    <td>CDC Social Vulnerability Index</td>
                    <td>{community1 && community1.cdc_svi}</td>
                    <td>{community2 && community2.cdc_svi}</td>
                </tr>
                <tr>
                    <td>24</td>
                    <td>BRIC Housing/Infrastructure Sub-Index Score</td>
                    <td>{community1 && nFormatter(community1.bric_house, 2)}</td>
                    <td>{community2 && nFormatter(community2.bric_house, 2)}</td>
                </tr>
                <tr>
                    <td>25</td>
                    <td>BRIC Institutional Sub-Index Score</td>
                    <td>{community1 && nFormatter(community1.bric_institutional, 2)}</td>
                    <td>{community2 && nFormatter(community2.bric_institutional, 2)}</td>
                </tr>
                <tr>
                    <td>26</td>
                    <td>BRIC Social Sub-Index Score</td>
                    <td>{community1 && nFormatter(community1.bric_social, 2)}</td>
                    <td>{community2 && nFormatter(community2.bric_social, 2)}</td>
                </tr>
                <tr>
                    <td>27</td>
                    <td>BRIC Community Capital Sub-Index Score</td>
                    <td>{community1 && nFormatter(community1.bric_community, 2)}</td>
                    <td>{community2 && nFormatter(community2.bric_community, 2)}</td>
                </tr>
                <tr>
                    <td>28</td>
                    <td>BRIC Environmental Sub-Index Score</td>
                    <td>{community1 && nFormatter(community1.bric_environmental, 2)}</td>
                    <td>{community2 && nFormatter(community2.bric_environmental, 2)}</td>
                </tr>
                <tr>
                    <td>29</td>
                    <td>BRIC Economic Sub-Index Score</td>
                    <td>{community1 && nFormatter(community1.bric_econ, 2)}</td>
                    <td>{community2 && nFormatter(community2.bric_econ, 2)}</td>
                </tr>
                <tr>
                    <td>30</td>
                    <td>BRIC Resilience Score</td>
                    <td>{community1 && nFormatter(community1.bric_resilience, 2)}</td>
                    <td>{community2 && nFormatter(community2.bric_resilience, 2)}</td>
                </tr>
                <tr>
                    <td>31</td>
                    <td>Income Stability</td>
                    <td>{community1 && nFormatter(community1.income_stability, 2)}</td>
                    <td>{community2 && nFormatter(community2.income_stability, 2)}</td>
                </tr>
                <tr>
                    <td>Unranked</td>
                    <td>Hazard Mitigation Plan Status</td>
                    <td>{community1 && community1.hm_plan_status}</td>
                    <td>{community2 && community2.hm_plan_status}</td>
                </tr>
                <tr>
                    <td>Unranked</td>
                    <td>HVRI Social Responsibility Index</td>
                    <td>{community1 && community1.hvri_sovi}</td>
                    <td>{community2 && community2.hvri_sovi}</td>
                </tr>                
                <tr>
                    <td>Unranked</td>
                    <td>NCHS Urban-Rural Classification Scheme</td>
                    <td>{community1 && community1.urban_rural}</td>
                    <td>{community2 && community2.urban_rural}</td>
                </tr>
                <tr>
                    <td>Unranked</td>
                    <td>Population Change (2010-2020)</td>
                    <td>{community1 && nFormatter(community1.pop_change, 2)}%</td>
                    <td>{community2 && nFormatter(community2.pop_change, 2)}%</td>
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
                    <Button variant="outline-secondary" type="submit" onClick={() => navigate(`/communityDetails/${sno1}`, { replace: true })}>
                        Go to Community 1
                    </Button>
                </div>
                <div style={buttonStyle}>
                    <Button variant="outline-secondary" type="submit" onClick={() => navigate(`/communityDetails/${sno2}`, { replace: true })}>
                        Go to Community 2
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

export default CommunityCompareDetails;