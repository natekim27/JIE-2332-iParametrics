import React, { useEffect, useState } from 'react';
import TextField from "@mui/material/TextField";

import Dropdown from 'react-bootstrap/Dropdown';

import './CommunityCompareSearch.css';
import CommunityTable from './CommunityTable';
import HeaderBanner from '../HeaderBanner/HeaderBanner';

const CommunityCompareSearch = () => {
    const [message, setMessage] = useState("");
    const [inputText, setInputText] = useState("");
    const [tableData, setTableData] = useState([]);
    const [populationChoice, setPopulationChoice] = useState(0);
    let inputHandler = (e) => {
        var lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase);
    };
    const columns = React.useMemo(() => [
        {
            Header: "",
            accessor: "serial_number",
        },
        {
            Header: "County",
            accessor: "name",
        },
        {
            Header: "State",
            accessor: "stusps",
        },
        { // Using dummy data as CWCS
            Header: "CWCS",
            accessor: "cwcs",
        }
    ], []);
    useEffect(() => {
        let endpoint = "http://127.0.0.1:5000/features/get-all";
        if (populationChoice == 1) {
            endpoint = "http://127.0.0.1:5000/features/get-by-population-range?min_pop=0&max_pop=10000";
        } else if (populationChoice == 2) {
            endpoint = "http://127.0.0.1:5000/features/get-by-population-range?min_pop=10000&max_pop=100000";
        } else if (populationChoice == 3) {
            endpoint = "http://127.0.0.1:5000/features/get-by-population-range?min_pop=100000";
        }
        
        fetch(endpoint, {
            method: "GET",
        })
        .then((response) => response.json())
        .then((data) => {
            setTableData(data);
        })
        .catch((err) => {
            console.log(err.message);
            setMessage(err.message);
        });
    }, [populationChoice]);    
    return(
        <div>
            <HeaderBanner header={"Compare Communities"}/>        
            <div className='CommunityCompareSearch'>
                <div className="flexbox-container1">
                    <div className="search-container">
                        <div className="search">
                            <TextField
                            id="outlined-basic"
                            onChange={inputHandler}
                            variant="outlined"
                            fullWidth
                            label="Search"
                            />
                        </div>
                    </div>
                    <div className="button">
                        <Dropdown>
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                Population
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item active={populationChoice === 1} onClick={() => setPopulationChoice(1)}>&lt; 10,000</Dropdown.Item>
                                <Dropdown.Item active={populationChoice === 2} onClick={() => setPopulationChoice(2)}>10,000 - 100,000</Dropdown.Item>
                                <Dropdown.Item active={populationChoice === 3} onClick={() => setPopulationChoice(3)}>&gt; 100,000</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
                <CommunityTable columns={columns} data={tableData} input={inputText} />             
            </div>
        </div>
    );
}

export default CommunityCompareSearch;
