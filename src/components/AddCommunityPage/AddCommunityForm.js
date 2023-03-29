import React, { useEffect, useState } from 'react';
import { Form, FormGroup, FormControl, Button, Row, Col, FormSelect } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

import AddCommunityPage from './AddCommunityPage.css';

const buttonStyle = {
  marginTop: 20,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'row',
};

const AddCommunityForm = () => {
    const navigate = useNavigate();
    const [filteredData, setFilteredData] = useState({});
    const [message, setMessage] = useState("");

    const [name, setName] = useState(null);
    const [namelsad, setNamelsad] = useState(null);
    const [stusps, setStusps] = useState(null);
    const [population, setPopulation] = useState(0);
    const [gdp, setGdp] = useState(0);
    const [avg_dem_pct, setAvgDemPct] = useState(0);
    const [avg_rep_pct, setAvgRepPct] = useState(0);
    const [declarations, setDeclarations] = useState(0);
    const [hm, setHM] = useState(0);
    const [pa, setPA] = useState(0);
    const [hm_plan_status, setHMPlanStatus] = useState("");
    const [nri, setNRI] = useState(0);
    const [cdc_svi, setCdcSvi] = useState(0);
    const [hvri_sovi, setHvriSovi] = useState(0);
    const [high_comb_haz_com, setHighCombHazCom] = useState(0);
    const [high_comb_haz_res, setHighCombHazRes] = useState(0);
    const [em_employment, setEmEmployement] = useState(0);
    const [em_employment_per, setEmEmployementPer] = useState(0);
    const [em_lq, setEmLq] = useState(0);
    const [urban_rural, setUrbanRural] = useState("");
    const [college_univ, setCollegeUniv] = useState(0);
    const [higher_ed, setHigherEd] = useState(0);
    const [poverty, setPoverty] = useState(0);
    const [broadband, setBroadBand] = useState(0);
    const [health_insurance, setHealthInsurance] = useState(0);
    const [voter_turn, setVoterTurn] = useState(0);
    const [pop_change, setPopChange] = useState(0);
    const [income_stability, setIncomeStability] = useState(0);
    const [built_environment, setBuiltEnvironment] = useState(0);
    const [operating_ratio, setOperatingRatio] = useState(0);
    const [taxes, setTaxes] = useState(0);
    const [bric_social, setBricSocial] = useState(0);
    const [bric_econ, setBricEcon] = useState(0);
    const [bric_house, setBricHouse] = useState(0);
    const [bric_community, setBricCommunity] = useState(0);
    const [bric_institutional, setBricInstitutional] = useState(0);
    const [bric_environmental, setBricEnvironmental] = useState(0);
    const [bric_resilience, setBricResilience] = useState(0);

    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await fetch(`http://127.0.0.1:5000/features/create-region`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                    name: name,
                    namelsad: name + namelsad,
                    stusps: stusps,
                    population: population,
                    gdp: gdp,
                    avg_dem_pct: avg_dem_pct,
                    avg_rep_pct: avg_rep_pct,
                    declarations: declarations,
                    hm: hm,
                    pa: pa,
                    hm_plan_status: hm_plan_status,
                    nri: nri,
                    cdc_svi: cdc_svi,
                    hvri_sovi: hvri_sovi,
                    high_comb_haz_com: high_comb_haz_com,
                    high_comb_haz_res: high_comb_haz_res,
                    em_employment: em_employment,
                    em_employment_per: em_employment_per,
                    em_lq: em_lq,
                    urban_rural: urban_rural,
                    college_univ: college_univ,
                    higher_ed: higher_ed,
                    poverty: poverty,
                    broadband: broadband,
                    health_insurance: health_insurance,
                    voter_turn: voter_turn,
                    pop_change: pop_change,
                    income_stability: income_stability,
                    built_environment: built_environment,
                    operating_ratio: operating_ratio,
                    taxes: taxes,
                    bric_social: bric_social,
                    bric_econ: bric_econ,
                    bric_house: bric_house,
                    bric_community: bric_community,
                    bric_institutional: bric_institutional,
                    bric_environmental: bric_environmental,
                    bric_resilience: bric_resilience
                }),
            });
            if (res.status === 200) {
                console.log(message);
                setMessage("Community updated successfully");
            } else {
                setMessage("Some error occured");
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <Form className="container mt-3 mb-3" id="AddCommunityForm" onSubmit={handleSubmit}>
                <Form.Label>Name</Form.Label>
                <FormControl type="text" placeholder="Name" onChange={(e) => setPopulation(e.target.value)}/>
                <Form.Label>Type of Community</Form.Label>
                <FormSelect defaultValue="Choose..." className="select-style">
                    <option disabled>Choose...</option>
                    <option value=" County" onChange={(e) => setNamelsad(e.target.value)}>County</option>
                    <option value=" Parish" onChange={(e) => setNamelsad(e.target.value)}>Parish</option>
                    <option value=" city" onChange={(e) => setNamelsad(e.target.value)}>city</option>
                </FormSelect>
                <Form.Label>State</Form.Label>
                <FormSelect defaultValue="Choose..." className="select-style">
                    <option disabled>Choose...</option>
                    <option value="AL" onChange={(e) => setStusps(e.target.value)}>Alabama</option>
                    <option value="AK" onChange={(e) => setStusps(e.target.value)}>Alaska</option>
                    <option value="AZ" onChange={(e) => setStusps(e.target.value)}>Arizona</option>
                    <option value="AR" onChange={(e) => setStusps(e.target.value)}>Arkansas</option>
                    <option value="CA" onChange={(e) => setStusps(e.target.value)}>California</option>
                    <option value="CO" onChange={(e) => setStusps(e.target.value)}>Colorado</option>
                    <option value="CT" onChange={(e) => setStusps(e.target.value)}>Connecticut</option>
                    <option value="DE" onChange={(e) => setStusps(e.target.value)}>Delaware</option>
                    <option value="FL" onChange={(e) => setStusps(e.target.value)}>Florida</option>
                    <option value="GA" onChange={(e) => setStusps(e.target.value)}>Georgia</option>
                    <option value="HI" onChange={(e) => setStusps(e.target.value)}>Hawaii</option>
                    <option value="ID" onChange={(e) => setStusps(e.target.value)}>Idaho</option>
                    <option value="IL" onChange={(e) => setStusps(e.target.value)}>Illinois</option>
                    <option value="IN" onChange={(e) => setStusps(e.target.value)}>Indiana</option>
                    <option value="IA" onChange={(e) => setStusps(e.target.value)}>Iowa</option>
                    <option value="KS" onChange={(e) => setStusps(e.target.value)}>Kansas</option>
                    <option value="KY" onChange={(e) => setStusps(e.target.value)}>Kentucky</option>
                    <option value="LA" onChange={(e) => setStusps(e.target.value)}>Louisiana</option>
                    <option value="ME" onChange={(e) => setStusps(e.target.value)}>Maine</option>
                    <option value="MD" onChange={(e) => setStusps(e.target.value)}>Maryland</option>
                    <option value="MA" onChange={(e) => setStusps(e.target.value)}>Massachusetts</option>
                    <option value="MI" onChange={(e) => setStusps(e.target.value)}>Michigan</option>
                    <option value="MN" onChange={(e) => setStusps(e.target.value)}>Minnesota</option>
                    <option value="MS" onChange={(e) => setStusps(e.target.value)}>Mississippi</option>
                    <option value="MO" onChange={(e) => setStusps(e.target.value)}>Missouri</option>
                    <option value="MT" onChange={(e) => setStusps(e.target.value)}>Montana</option>
                    <option value="NE" onChange={(e) => setStusps(e.target.value)}>Nebraska</option>
                    <option value="NV" onChange={(e) => setStusps(e.target.value)}>Nevada</option>
                    <option value="NH" onChange={(e) => setStusps(e.target.value)}>New Hampshire</option>
                    <option value="NJ" onChange={(e) => setStusps(e.target.value)}>New Jersey</option>
                    <option value="NM" onChange={(e) => setStusps(e.target.value)}>New Mexico</option>
                    <option value="NY" onChange={(e) => setStusps(e.target.value)}>New York</option>
                    <option value="NC" onChange={(e) => setStusps(e.target.value)}>North Carolina</option>
                    <option value="ND" onChange={(e) => setStusps(e.target.value)}>North Dakota</option>
                    <option value="OH" onChange={(e) => setStusps(e.target.value)}>Ohio</option>
                    <option value="OK" onChange={(e) => setStusps(e.target.value)}>Oklahoma</option>
                    <option value="OR" onChange={(e) => setStusps(e.target.value)}>Oregon</option>
                    <option value="PA" onChange={(e) => setStusps(e.target.value)}>Pennsylvania</option>
                    <option value="RI" onChange={(e) => setStusps(e.target.value)}>Rhode Island</option>
                    <option value="SC" onChange={(e) => setStusps(e.target.value)}>South Carolina</option>
                    <option value="SD" onChange={(e) => setStusps(e.target.value)}>South Dakota</option>
                    <option value="TN" onChange={(e) => setStusps(e.target.value)}>Tennessee</option>
                    <option value="TX" onChange={(e) => setStusps(e.target.value)}>Texas</option>
                    <option value="UT" onChange={(e) => setStusps(e.target.value)}>Utah</option>
                    <option value="VT" onChange={(e) => setStusps(e.target.value)}>Vermont</option>
                    <option value="VA" onChange={(e) => setStusps(e.target.value)}>Virginia</option>
                    <option value="WA" onChange={(e) => setStusps(e.target.value)}>Washington</option>
                    <option value="WV" onChange={(e) => setStusps(e.target.value)}>West Virginia</option>
                    <option value="WI" onChange={(e) => setStusps(e.target.value)}>Wisconsin</option>
                    <option value="WY" onChange={(e) => setStusps(e.target.value)}>Wyoming</option>
                </FormSelect>
                <Form.Label>Declarations</Form.Label>
                <FormControl type="text" placeholder="Declarations" onChange={(e) => setDeclarations(e.target.value)}/>
                <Form.Label>Population</Form.Label>
                <FormControl type="text" placeholder="Population" onChange={(e) => setPopulation(e.target.value)}/>
                <Form.Label>GDP</Form.Label>
                <FormControl type="text" placeholder="GDP" onChange={(e) => setGdp(e.target.value)}/>
                <Form.Label>Declarations</Form.Label>
                <FormControl type="text" placeholder="Declarations" onChange={(e) => setDeclarations(e.target.value)}/>
                <Form.Label>Avg Democratic % of Votes</Form.Label>
                <FormControl type="text" placeholder="Votes %" onChange={(e) => setAvgDemPct(e.target.value)}/>
                <Form.Label>Avg Republic % of Votes</Form.Label>
                <FormControl type="text" placeholder="Votes %" onChange={(e) => setAvgRepPct(e.target.value)}/>
                <Form.Label>HM Obligations</Form.Label>
                <FormControl type="text" placeholder="HM Obligations" onChange={(e) => setHM(e.target.value)}/>
                <Form.Label>PA Obligations</Form.Label>
                <FormControl type="text" placeholder="PA Obligations" onChange={(e) => setPA(e.target.value)}/>
                <Form.Label>Hazard Mitigation Plan Status</Form.Label>
                <FormControl type="text" placeholder="Hazard Mitigation Plan Status" onChange={(e) => setHMPlanStatus(e.target.value)}/>
                <Form.Label>National Risk Index</Form.Label>
                <FormControl type="text" placeholder="National Risk Index" onChange={(e) => setNRI(e.target.value)}/>
                <Form.Label>CDC Social Vulnerability Index</Form.Label>
                <FormControl type="text" placeholder="CDC Social Vulnerability Index" onChange={(e) => setCdcSvi(e.target.value)}/>
                <Form.Label>HVRI Social Vulnerability Index</Form.Label>
                <FormControl type="text" placeholder="HVRI Social Vulnerability Index" onChange={(e) => setHvriSovi(e.target.value)}/>
                <Form.Label>Resistant Commercial Buildings %</Form.Label>
                <FormControl type="text" placeholder="Resistant Commercial Buildings %" onChange={(e) => setHighCombHazCom(e.target.value)}/>
                <Form.Label>Resistant Residential Buildings %</Form.Label>
                <FormControl type="text" placeholder="Resistant Residential Buildings %" onChange={(e) => setHighCombHazRes(e.target.value)}/>
                <Form.Label>Broadband Subscription %</Form.Label>
                <FormControl type="text" placeholder="Broadband Subscription %" onChange={(e) => setBroadBand(e.target.value)}/>
                <Form.Label>Emergency Manageement Directors Employement</Form.Label>
                <FormControl type="text" placeholder="Emergency Manageement Directors Employement" onChange={(e) => setEmEmployement(e.target.value)}/>
                <Form.Label>Emergency Manageement Directors Employement / 1000 Jobs</Form.Label>
                <FormControl type="text" placeholder="Emergency Manageement Directors Employement / 1000 Jobs" onChange={(e) => setEmEmployementPer(e.target.value)}/>
                <Form.Label>Emergency Manageement Directors Location Quotient</Form.Label>
                <FormControl type="text" placeholder="Emergency Manageement Directors Location Quotient" onChange={(e) => setEmLq(e.target.value)}/>
                <Form.Label>NCHS Urban-Rural Classification Scheme</Form.Label>
                <FormControl type="text" placeholder="NCHS Urban-Rural Classification Scheme" onChange={(e) => setUrbanRural(e.target.value)}/>
                <Form.Label>Colleges / Universities</Form.Label>
                <FormControl type="text" placeholder="Colleges / Universities" onChange={(e) => setCollegeUniv(e.target.value)}/>
                <Form.Label>Higher Education</Form.Label>
                <FormControl type="text" placeholder="Higher Education" onChange={(e) => setHigherEd(e.target.value)}/>
                <Form.Label>Above Poverty Line</Form.Label>
                <FormControl type="text" placeholder="Above Poverty Line" onChange={(e) => setPoverty(e.target.value)}/>
                <Form.Label>Health Insurance</Form.Label>
                <FormControl type="text" placeholder="Health Insurance" onChange={(e) => setHealthInsurance(e.target.value)}/>
                <Form.Label>Voter Turnout (2020)</Form.Label>
                <FormControl type="text" placeholder="Voter Turnout (2020)" onChange={(e) => setVoterTurn(e.target.value)}/>
                <Form.Label>Population Change (2010-2020)</Form.Label>
                <FormControl type="text" placeholder="Population Change (2010-2020)" onChange={(e) => setPopChange(e.target.value)}/>
                <Form.Label>Income Stability</Form.Label>
                <FormControl type="text" placeholder="Income Stability" onChange={(e) => setIncomeStability(e.target.value)}/>
                <Form.Label>Built Environment</Form.Label>
                <FormControl type="text" placeholder="Built Environment" onChange={(e) => setBuiltEnvironment(e.target.value)}/>
                <Form.Label>Operating Ratio</Form.Label>
                <FormControl type="text" placeholder="Operating Ratio" onChange={(e) => setOperatingRatio(e.target.value)}/>
                <Form.Label>Taxes</Form.Label>
                <FormControl type="text" placeholder="Taxes" onChange={(e) => setTaxes(e.target.value)}/>
                <Form.Label>BRIC Social Sub-Index Score</Form.Label>
                <FormControl type="text" placeholder="BRIC Social Sub-Index Score" onChange={(e) => setBricSocial(e.target.value)}/>
                <Form.Label>BRIC Economic Sub-Index Score</Form.Label>
                <FormControl type="text" placeholder="BRIC Economic Sub-Index Score" onChange={(e) => setBricEcon(e.target.value)}/>
                <Form.Label>BRIC Housing/Infrastructure Sub-Index Score</Form.Label>
                <FormControl type="text" placeholder="BRIC Housing/Infrastructure Sub-Index Score" onChange={(e) => setBricHouse(e.target.value)}/>
                <Form.Label>BRIC Community Capital Sub-Index Score</Form.Label>
                <FormControl type="text" placeholder="BRIC Community Capital Sub-Index Score" onChange={(e) => setBricCommunity(e.target.value)}/>
                <Form.Label>BRIC Institutional Sub-Index Score</Form.Label>
                <FormControl type="text" placeholder="BRIC Institutional Sub-Index Score" onChange={(e) => setBricInstitutional(e.target.value)}/>
                <Form.Label>BRIC Environmental Sub-Index Score</Form.Label>
                <FormControl type="text" placeholder="BRIC Environmental Sub-Index Score" onChange={(e) => setBricEnvironmental(e.target.value)}/>
                <Form.Label>BRIC Resilience Score</Form.Label>
                <FormControl type="text" placeholder="BRIC Resilience Score" onChange={(e) => setBricResilience(e.target.value)}/>
                <div style={buttonStyle}>
                    <Button variant="primary" type="submit">
                        Submit Changes
                    </Button>
                    <Button variant="outline-secondary" type="submit" onClick={() => navigate("/communitySearch", { replace: true })}>
                        Back to Search
                    </Button>
                </div>
            </Form>
        </div>
    );
}

export default AddCommunityForm;