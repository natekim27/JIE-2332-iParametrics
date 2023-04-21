import React, { useEffect, useState } from 'react';
import { Form, FormGroup, FormControl, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const buttonStyle = {
  marginTop: 20,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'row',
};

const EditCommunityDetailsForm = () => {
    const navigate = useNavigate();
    const { sno } = useParams();
    const [filteredData, setFilteredData] = useState({});
    const [message, setMessage] = useState("");

    const [population, setPopulation] = useState(filteredData && filteredData.population);
    const [gdp, setGdp] = useState(filteredData && filteredData.gdp);
    const [avg_dem_pct, setAvgDemPct] = useState(filteredData && filteredData.avg_dem_pct);
    const [avg_rep_pct, setAvgRepPct] = useState(filteredData && filteredData.avg_rep_pct);
    const [declarations, setDeclarations] = useState(filteredData && filteredData.declarations);
    const [hm, setHM] = useState(filteredData && filteredData.hm);
    const [pa, setPA] = useState(filteredData && filteredData.PA);
    const [hm_plan_status, setHMPlanStatus] = useState(filteredData && filteredData.hm_plan_status);
    const [nri, setNRI] = useState(filteredData && filteredData.nri);
    const [cdc_svi, setCdcSvi] = useState(filteredData && filteredData.cdc_svi);
    const [hvri_sovi, setHvriSovi] = useState(filteredData && filteredData.hvri_sovi);
    const [high_comb_haz_com, setHighCombHazCom] = useState(filteredData && filteredData.high_comb_haz_com);
    const [high_comb_haz_res, setHighCombHazRes] = useState(filteredData && filteredData.high_comb_haz_res);
    const [em_employment, setEmEmployement] = useState(filteredData && filteredData.em_employment);
    const [em_employment_per, setEmEmployementPer] = useState(filteredData && filteredData.em_employment_per);
    const [em_lq, setEmLq] = useState(filteredData && filteredData.em_lq);
    const [urban_rural, setUrbanRural] = useState(filteredData && filteredData.urban_rural);
    const [college_univ, setCollegeUniv] = useState(filteredData && filteredData.college_univ);
    const [higher_ed, setHigherEd] = useState(filteredData && filteredData.higher_ed);
    const [poverty, setPoverty] = useState(filteredData && filteredData.poverty);
    const [broadband, setBroadBand] = useState(filteredData && filteredData.broadband);
    const [health_insurance, setHealthInsurance] = useState(filteredData && filteredData.health_insurance);
    const [voter_turn, setVoterTurn] = useState(filteredData && filteredData.voter_turn);
    const [pop_change, setPopChange] = useState(filteredData && filteredData.pop_change);
    const [income_stability, setIncomeStability] = useState(filteredData && filteredData.income_stability);
    const [built_environment, setBuiltEnvironment] = useState(filteredData && filteredData.built_environment);
    const [operating_ratio, setOperatingRatio] = useState(filteredData && filteredData.operating_ratio);
    const [taxes, setTaxes] = useState(filteredData && filteredData.taxes);
    const [bric_social, setBricSocial] = useState(filteredData && filteredData.bric_social);
    const [bric_econ, setBricEcon] = useState(filteredData && filteredData.bric_econ);
    const [bric_house, setBricHouse] = useState(filteredData && filteredData.bric_house);
    const [bric_community, setBricCommunity] = useState(filteredData && filteredData.bric_community);
    const [bric_institutional, setBricInstitutional] = useState(filteredData && filteredData.bric_institutional);
    const [bric_environmental, setBricEnvironmental] = useState(filteredData && filteredData.bric_environmental);
    const [bric_resilience, setBricResilience] = useState(filteredData && filteredData.bric_resilience);

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

    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://127.0.0.1:5000/features/update`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                    sno: sno,
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
            if (response.status === 200) {
                console.log(message);
                setMessage("Community updated successfully");
                navigate(`/communityDetails/${filteredData.serial_number}`, { replace: true });
            } else {
                setMessage("Some error occurred");
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <div>
                <h4>{filteredData && filteredData.name}, {filteredData && filteredData.stusps}</h4>
            </div>
            <div>
                <Form className="container mt-3 mb-3" id="EditCommunityDetailsForm" onSubmit={handleSubmit}>
                    <Form.Label ></Form.Label>
                    <FormGroup>
                    <Form.Label>Population</Form.Label>
                    <FormControl type="text" placeholder="Population" defaultValue={filteredData && filteredData.population} onChange={(e) => setPopulation(e.target.value)}/>
                    <Form.Label>GDP</Form.Label>
                    <FormControl type="text" placeholder="GDP" defaultValue={filteredData && filteredData.gdp} onChange={(e) => setGdp(e.target.value)}/>
                    <Form.Label>Declarations</Form.Label>
                    <FormControl type="text" placeholder="Declarations" defaultValue={filteredData && filteredData.declarations} onChange={(e) => setDeclarations(e.target.value)}/>
                    <Form.Label>Avg Democratic % of Votes</Form.Label>
                    <FormControl type="text" placeholder="Votes %" defaultValue={filteredData && filteredData.avg_dem_pct} onChange={(e) => setAvgDemPct(e.target.value)}/>
                    <Form.Label>Avg Republic % of Votes</Form.Label>
                    <FormControl type="text" placeholder="Votes %" defaultValue={filteredData && filteredData.avg_rep_pct} onChange={(e) => setAvgRepPct(e.target.value)}/>
                    <Form.Label>HM Obligations</Form.Label>
                    <FormControl type="text" placeholder="HM Obligations" defaultValue={filteredData && filteredData.hm} onChange={(e) => setHM(e.target.value)}/>
                    <Form.Label>PA Obligations</Form.Label>
                    <FormControl type="text" placeholder="PA Obligations" defaultValue={filteredData && filteredData.pa} onChange={(e) => setPA(e.target.value)}/>
                    <Form.Label>Hazard Mitigation Plan Status</Form.Label>
                    <FormControl type="text" placeholder="Hazard Mitigation Plan Status" defaultValue={filteredData && filteredData.hm_plan_status} onChange={(e) => setHMPlanStatus(e.target.value)}/>
                    <Form.Label>National Risk Index</Form.Label>
                    <FormControl type="text" placeholder="National Risk Index" defaultValue={filteredData && filteredData.nri} onChange={(e) => setNRI(e.target.value)}/>
                    <Form.Label>CDC Social Vulnerability Index</Form.Label>
                    <FormControl type="text" placeholder="CDC Social Vulnerability Index" defaultValue={filteredData && filteredData.cdc_svi} onChange={(e) => setCdcSvi(e.target.value)}/>
                    <Form.Label>HVRI Social Vulnerability Index</Form.Label>
                    <FormControl type="text" placeholder="HVRI Social Vulnerability Index" defaultValue={filteredData && filteredData.cdc_svi} onChange={(e) => setHvriSovi(e.target.value)}/>
                    <Form.Label>Resistant Commercial Buildings %</Form.Label>
                    <FormControl type="text" placeholder="Resistant Commercial Buildings %" defaultValue={filteredData && filteredData.high_comb_haz_com} onChange={(e) => setHighCombHazCom(e.target.value)}/>
                    <Form.Label>Resistant Residential Buildings %</Form.Label>
                    <FormControl type="text" placeholder="Resistant Residential Buildings %" defaultValue={filteredData && filteredData.high_comb_haz_res} onChange={(e) => setHighCombHazRes(e.target.value)}/>
                    <Form.Label>Broadband Subscription %</Form.Label>
                    <FormControl type="text" placeholder="Broadband Subscription %" defaultValue={filteredData && filteredData.broadband} onChange={(e) => setBroadBand(e.target.value)}/>
                    <Form.Label>Emergency Manageement Directors Employement</Form.Label>
                    <FormControl type="text" placeholder="Emergency Manageement Directors Employement" defaultValue={filteredData && filteredData.em_employment} onChange={(e) => setEmEmployement(e.target.value)}/>
                    <Form.Label>Emergency Manageement Directors Employement / 1000 Jobs</Form.Label>
                    <FormControl type="text" placeholder="Emergency Manageement Directors Employement / 1000 Jobs" defaultValue={filteredData && filteredData.em_employment_per} onChange={(e) => setEmEmployementPer(e.target.value)}/>
                    <Form.Label>Emergency Manageement Directors Location Quotient</Form.Label>
                    <FormControl type="text" placeholder="Emergency Manageement Directors Location Quotient" defaultValue={filteredData && filteredData.em_lq} onChange={(e) => setEmLq(e.target.value)}/>
                    <Form.Label>NCHS Urban-Rural Classification Scheme</Form.Label>
                    <FormControl type="text" placeholder="NCHS Urban-Rural Classification Scheme" defaultValue={filteredData && filteredData.urban_rural} onChange={(e) => setUrbanRural(e.target.value)}/>
                    <Form.Label>Colleges / Universities</Form.Label>
                    <FormControl type="text" placeholder="Colleges / Universities" defaultValue={filteredData && filteredData.college_univ} onChange={(e) => setCollegeUniv(e.target.value)}/>
                    <Form.Label>Higher Education</Form.Label>
                    <FormControl type="text" placeholder="Higher Education" defaultValue={filteredData && filteredData.higher_ed} onChange={(e) => setHigherEd(e.target.value)}/>
                    <Form.Label>Above Poverty Line</Form.Label>
                    <FormControl type="text" placeholder="Above Poverty Line" defaultValue={filteredData && filteredData.poverty} onChange={(e) => setPoverty(e.target.value)}/>
                    <Form.Label>Health Insurance</Form.Label>
                    <FormControl type="text" placeholder="Health Insurance" defaultValue={filteredData && filteredData.health_insurance} onChange={(e) => setHealthInsurance(e.target.value)}/>
                    <Form.Label>Voter Turnout (2020)</Form.Label>
                    <FormControl type="text" placeholder="Voter Turnout (2020)" defaultValue={filteredData && filteredData.voter_turn} onChange={(e) => setVoterTurn(e.target.value)}/>
                    <Form.Label>Population Change (2010-2020)</Form.Label>
                    <FormControl type="text" placeholder="Population Change (2010-2020)" defaultValue={filteredData && filteredData.pop_change} onChange={(e) => setPopChange(e.target.value)}/>
                    <Form.Label>Income Stability</Form.Label>
                    <FormControl type="text" placeholder="Income Stability" defaultValue={filteredData && filteredData.income_stability} onChange={(e) => setIncomeStability(e.target.value)}/>
                    <Form.Label>Built Environment</Form.Label>
                    <FormControl type="text" placeholder="Built Environment" defaultValue={filteredData && filteredData.built_environment} onChange={(e) => setBuiltEnvironment(e.target.value)}/>
                    <Form.Label>Operating Ratio</Form.Label>
                    <FormControl type="text" placeholder="Operating Ratio" defaultValue={filteredData && filteredData.operating_ratio} onChange={(e) => setOperatingRatio(e.target.value)}/>
                    <Form.Label>Taxes</Form.Label>
                    <FormControl type="text" placeholder="Taxes" defaultValue={filteredData && filteredData.taxes} onChange={(e) => setTaxes(e.target.value)}/>
                    <Form.Label>BRIC Social Sub-Index Score</Form.Label>
                    <FormControl type="text" placeholder="BRIC Social Sub-Index Score" defaultValue={filteredData && filteredData.bric_social} onChange={(e) => setBricSocial(e.target.value)}/>
                    <Form.Label>BRIC Economic Sub-Index Score</Form.Label>
                    <FormControl type="text" placeholder="BRIC Economic Sub-Index Score" defaultValue={filteredData && filteredData.bric_econ} onChange={(e) => setBricEcon(e.target.value)}/>
                    <Form.Label>BRIC Housing/Infrastructure Sub-Index Score</Form.Label>
                    <FormControl type="text" placeholder="BRIC Housing/Infrastructure Sub-Index Score" defaultValue={filteredData && filteredData.bric_house} onChange={(e) => setBricHouse(e.target.value)}/>
                    <Form.Label>BRIC Community Capital Sub-Index Score</Form.Label>
                    <FormControl type="text" placeholder="BRIC Community Capital Sub-Index Score" defaultValue={filteredData && filteredData.bric_community} onChange={(e) => setBricCommunity(e.target.value)}/>
                    <Form.Label>BRIC Institutional Sub-Index Score</Form.Label>
                    <FormControl type="text" placeholder="BRIC Institutional Sub-Index Score" defaultValue={filteredData && filteredData.bric_institutional} onChange={(e) => setBricInstitutional(e.target.value)}/>
                    <Form.Label>BRIC Environmental Sub-Index Score</Form.Label>
                    <FormControl type="text" placeholder="BRIC Environmental Sub-Index Score" defaultValue={filteredData && filteredData.bric_environmental} onChange={(e) => setBricEnvironmental(e.target.value)}/>
                    <Form.Label>BRIC Resilience Score</Form.Label>
                    <FormControl type="text" placeholder="BRIC Resilience Score" defaultValue={filteredData && filteredData.bric_resilience} onChange={(e) => setBricResilience(e.target.value)}/>
                    <div style={buttonStyle}>
                        <Button variant="outline-secondary" type="submit">
                            Submit Changes
                        </Button>
                        <Button variant="outline-secondary" onClick={() => navigate(`/communityDetails/${filteredData.serial_number}`, { replace: true })}>
                            Back to Community Details
                        </Button>
                    </div>
                    </FormGroup>
                </Form>
            </div>
        </div>
    );
}

export default EditCommunityDetailsForm;