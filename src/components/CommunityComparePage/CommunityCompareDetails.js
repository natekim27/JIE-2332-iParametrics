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
        data: "{" + JSON.stringify(community1[0]) + "," + JSON.stringify(community1[0]) + "}",
        fileName: community1[0].name + '_' + community1[0].stusps + '_' + community2[0].name + '_' + community2[0].stusps + '.json',
        fileType: 'text/json',
        });
    };

    const exportToCsv = e => {
        e.preventDefault();

        // Headers for each column
        let headers = ['name,stusps,cwcs,population,gdp,avg_dem_pct,avg_rep_pct,declarations,hm,pa,hm_plan_status,nri,cdc_svi,hvri_sovi,high_comb_haz_com,high_comb_haz_res,em_employment,em_employment_per,em_lq,urban_rural,college_univ,higher_ed,poverty,broadband,health_insurance,voter_turn,pop_change,income_stability,built_environment,operating_ratio,taxes,bric_social,bric_econ,bric_house,bric_community,bric_institutional,bric_environmental,bric_resilience'];

        // Convert users data to a csv
        let community1Csv = [community1[0].name + ','
                            + community1[0].stusps + ','
                            + community1[0].cwcs + ','
                            + community1[0].population + ','
                            + community1[0].gdp + ','
                            + community1[0].avg_dem_pct + ','
                            + community1[0].avg_rep_pct + ','
                            + community1[0].declarations + ','
                            + community1[0].hm + ','
                            + community1[0].pa + ','
                            + community1[0].hm_plan_status + ','
                            + community1[0].nri + ','
                            + community1[0].cdc_svi + ','
                            + community1[0].hvri_sovi + ','
                            + community1[0].high_comb_haz_com + ','
                            + community1[0].high_comb_haz_res + ','
                            + community1[0].em_employment + ','
                            + community1[0].em_employment_per + ','
                            + community1[0].em_lq + ','
                            + community1[0].urban_rural + ','
                            + community1[0].college_univ + ','
                            + community1[0].higher_ed + ','
                            + community1[0].poverty + ','
                            + community1[0].broadband + ','
                            + community1[0].health_insurance + ','
                            + community1[0].voter_turn + ','
                            + community1[0].pop_change + ','
                            + community1[0].income_stability + ','
                            + community1[0].built_environment + ','
                            + community1[0].operating_ratio + ','
                            + community1[0].taxes + ','
                            + community1[0].bric_social + ','
                            + community1[0].bric_econ + ','
                            + community1[0].bric_house + ','
                            + community1[0].bric_community + ','
                            + community1[0].bric_institutional + ','
                            + community1[0].bric_environmental + ','
                            + community1[0].bric_resilience];

        let community2Csv = [community2[0].name + ','
                            + community2[0].stusps + ','
                            + community2[0].cwcs + ','
                            + community2[0].population + ','
                            + community2[0].gdp + ','
                            + community2[0].avg_dem_pct + ','
                            + community2[0].avg_rep_pct + ','
                            + community2[0].declarations + ','
                            + community2[0].hm + ','
                            + community2[0].pa + ','
                            + community2[0].hm_plan_status + ','
                            + community2[0].nri + ','
                            + community2[0].cdc_svi + ','
                            + community2[0].hvri_sovi + ','
                            + community2[0].high_comb_haz_com + ','
                            + community2[0].high_comb_haz_res + ','
                            + community2[0].em_employment + ','
                            + community2[0].em_employment_per + ','
                            + community2[0].em_lq + ','
                            + community2[0].urban_rural + ','
                            + community2[0].college_univ + ','
                            + community2[0].higher_ed + ','
                            + community2[0].poverty + ','
                            + community2[0].broadband + ','
                            + community2[0].health_insurance + ','
                            + community2[0].voter_turn + ','
                            + community2[0].pop_change + ','
                            + community2[0].income_stability + ','
                            + community2[0].built_environment + ','
                            + community2[0].operating_ratio + ','
                            + community2[0].taxes + ','
                            + community2[0].bric_social + ','
                            + community2[0].bric_econ + ','
                            + community2[0].bric_house + ','
                            + community2[0].bric_community + ','
                            + community2[0].bric_institutional + ','
                            + community2[0].bric_environmental + ','
                            + community2[0].bric_resilience];

        downloadFile({
            data: [...headers, ...community1Csv, ...community2Csv].join('\n'),
            fileName: community1[0].name + '_' + community1[0].stusps + '_' + community2[0].name + '_' + community2[0].stusps + '.csv',
            fileType: 'text/csv',
        });
    };

    console.log(community1);
    
    return (
        <div className='font-face-gs'>
            <h4>{community1 && community1[0].name}, {community1 && community1[0].stusps} and {community2 && community2[0].name}, {community2 && community2[0].stusps}</h4>
            <Table className='table'>
                <thead>
                    <tr>
                        <th>Factor</th>
                        <th>{community1 && community1[0].name}</th>
                        <th>{community2 && community2[0].name}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><b>CWCS</b></td>
                        <td><b>{community1 && community1[0].cwcs}</b></td>
                        <td><b>{community2 && community2[0].cwcs}</b></td>
                    </tr>
                    <tr>
                        <td>Public Assistance Obligations</td>
                        <td>${community1 && nFormatter(community1[0].pa, 2)}</td>
                        <td>${community2 && nFormatter(community2[0].pa, 2)}</td>
                    </tr>
                    <tr>
                        <td>Hazard Mitigation Obligations</td>
                        <td>${community1 && nFormatter(community1[0].hm, 2)}</td>
                        <td>${community2 && nFormatter(community2[0].hm, 2)}</td>
                    </tr>
                    <tr>
                        <td>GDP</td>
                        <td>${community1 && nFormatter(community1[0].gdp * 1000, 2)}</td>
                        <td>${community2 && nFormatter(community2[0].gdp * 1000, 2)}</td>
                    </tr>
                    <tr>
                        <td>Taxes</td>
                        <td>${community1 && nFormatter(community1[0].taxes, 2)}</td>
                        <td>${community2 && nFormatter(community2[0].taxes, 2)}</td>
                    </tr>
                    <tr>
                        <td>Population</td>
                        <td>{community1 && nFormatter(community1[0].population, 2)}</td>
                        <td>{community2 && nFormatter(community2[0].population, 2)}</td>
                    </tr>
                    <tr>
                        <td>EM Directors Employment</td>
                        <td>{community1 && nFormatter(community1[0].em_employment, 2)}</td>
                        <td>{community2 && nFormatter(community2[0].em_employment, 2)}</td>
                    </tr>
                    <tr>
                        <td>Colleges / Universities</td>
                        <td>{community1 && nFormatter(community1[0].college_univ, 2)}</td>
                        <td>{community2 && nFormatter(community2[0].college_univ, 2)}</td>
                    </tr>
                    <tr>
                        <td>Major Disaster Declarations</td>
                        <td>{community1 && nFormatter(community1[0].declarations, 2)}</td>
                        <td>{community2 && nFormatter(community2[0].declarations, 2)}</td>
                    </tr>
                    <tr>
                        <td>Resistant Commercial Buildings</td>
                        <td>{community1 && community1[0].high_comb_haz_com}%</td>
                        <td>{community2 && community2[0].high_comb_haz_com}%</td>
                    </tr>
                    <tr>
                        <td>National Risk Index</td>
                        <td>{community1 && nFormatter(community1[0].nri, 2)}</td>
                        <td>{community2 && nFormatter(community2[0].nri, 2)}</td>
                    </tr>
                    <tr>
                        <td>Built Environment</td>
                        <td>{community1 && nFormatter(community1[0].pa, 2)}%</td>
                        <td>{community2 && nFormatter(community2[0].pa, 2)}%</td>
                    </tr>
                    {extendedView ? <>
                    <tr>
                        <td>Average Democratic Percentage</td>
                        <td>{community1 && nFormatter(community1[0].avg_dem_pct, 2)}%</td>
                        <td>{community2 && nFormatter(community2[0].avg_dem_pct, 2)}%</td>
                    </tr>
                    <tr>
                        <td>Average Republican Percentage</td>
                        <td>{community1 && nFormatter(community1[0].avg_rep_pct, 2)}%</td>
                        <td>{community2 && nFormatter(community2[0].avg_rep_pct, 2)}%</td>
                    </tr>
                    <tr>
                        <td>Resistant Residential Buildings</td>
                        <td>{community1 && nFormatter(community1[0].high_comb_haz_res, 2)}%</td>
                        <td>{community2 && nFormatter(community2[0].high_comb_haz_res, 2)}%</td>
                    </tr>
                    <tr>
                        <td>Hazard Mitigation Plan Status</td>
                        <td>{community1 && community1[0].hm_plan_status}</td>
                        <td>{community2 && community2[0].hm_plan_status}</td>
                    </tr>
                    <tr>
                        <td>CDC Social Vulnerability Index</td>
                        <td>{community1 && community1[0].cdc_svi}</td>
                        <td>{community2 && community2[0].cdc_svi}</td>
                    </tr>
                    <tr>
                        <td>HVRI Social Responsibility Index</td>
                        <td>{community1 && community1[0].hvri_sovi}</td>
                        <td>{community2 && community2[0].hvri_sovi}</td>
                    </tr>
                    <tr>
                        <td>Operating Ratio</td>
                        <td>{community1 && nFormatter(community1[0].operating_ratio, 2)}</td>
                        <td>{community2 && nFormatter(community2[0].operating_ratio, 2)}</td>
                    </tr>
                    <tr>
                        <td>EM Directors Employment / 100 Jobs</td>
                        <td>{community1 && community1[0].em_employment_per}</td>
                        <td>{community2 && community2[0].em_employment_per}</td>
                    </tr>
                    <tr>
                        <td>EM Directors Location Quotient</td>
                        <td>{community1 && community1[0].em_lq}</td>
                        <td>{community2 && community2[0].em_lq}</td>
                    </tr>
                    <tr>
                        <td>NCHS Urban-Rural Classification Scheme</td>
                        <td>{community1 && community1[0].urban_rural}</td>
                        <td>{community2 && community2[0].urban_rural}</td>
                    </tr>
                    <tr>
                        <td>Higher Education</td>
                        <td>{community1 && nFormatter(community1[0].higher_ed, 2)}%</td>
                        <td>{community2 && nFormatter(community2[0].higher_ed, 2)}%</td>
                    </tr>
                    <tr>
                        <td>Health Insurance</td>
                        <td>{community1 && nFormatter(community1[0].health_insurance, 2)}%</td>
                        <td>{community2 && nFormatter(community2[0].health_insurance, 2)}%</td>
                    </tr>
                    <tr>
                        <td>Voter Turnout (2020)</td>
                        <td>{community1 && nFormatter(community1[0].voter_turn, 2)}%</td>
                        <td>{community2 && nFormatter(community2[0].voter_turn, 2)}%</td>
                    </tr>
                    <tr>
                        <td>Above Poverty Line</td>
                        <td>{community1 && nFormatter(community1[0].pop_change, 2)}%</td>
                        <td>{community2 && nFormatter(community2[0].pop_change, 2)}%</td>
                    </tr>
                    <tr>
                        <td>Population Change (2010-2020)</td>
                        <td>{community1 && nFormatter(community1[0].poverty, 2)}%</td>
                        <td>{community2 && nFormatter(community2[0].poverty, 2)}%</td>
                    </tr>
                    <tr>
                        <td>Income Stability</td>
                        <td>{community1 && community1[0].income_stability}</td>
                        <td>{community2 && community2[0].income_stability}</td>
                    </tr>
                    <tr>
                        <td>Broadband Subscription</td>
                        <td>{community1 && nFormatter(community1[0].broadband, 2)}%</td>
                        <td>{community2 && nFormatter(community2[0].broadband, 2)}%</td>
                    </tr>
                    <tr>
                        <td>BRIC Social Sub-Index Score</td>
                        <td>{community1 && community1[0].bric_social}</td>
                        <td>{community2 && community2[0].bric_social}</td>
                    </tr>
                    <tr>
                        <td>BRIC Economic Sub-Index Score</td>
                        <td>{community1 && community1[0].bric_econ}</td>
                        <td>{community2 && community2[0].bric_econ}</td>
                    </tr>
                    <tr>
                        <td>BRIC Housing/Infrastructure Sub-Index Score</td>
                        <td>{community1 && community1[0].bric_house}</td>
                        <td>{community2 && community2[0].bric_house}</td>
                    </tr>
                    <tr>
                        <td>BRIC Community Capital Sub-Index Score</td>
                        <td>{community1 && community1[0].bric_community}</td>
                        <td>{community2 && community2[0].bric_community}</td>
                    </tr>
                    <tr>
                        <td>BRIC Institutional Sub-Index Score</td>
                        <td>{community1 && community1[0].bric_institutional}</td>
                        <td>{community2 && community2[0].bric_institutional}</td>
                    </tr>
                    <tr>
                        <td>BRIC Environmental Sub-Index Score</td>
                        <td>{community1 && community1[0].bric_environmental}</td>
                        <td>{community2 && community2[0].bric_environmental}</td>
                    </tr>
                    <tr>
                        <td>BRIC Resilience Score</td>
                        <td>{community1 && community1[0].bric_resilience}</td>
                        <td>{community2 && community2[0].bric_resilience}</td>
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

export default CommunityCompareDetails;