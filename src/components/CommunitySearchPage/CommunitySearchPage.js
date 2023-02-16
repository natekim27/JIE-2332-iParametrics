import React, { useEffect, useState } from 'react';
import TextField from "@mui/material/TextField";

import Dropdown from 'react-bootstrap/Dropdown';


import './CommunitySearchPage.css';
import CommunityTable from './CommunityTable';
import CwcsData from '../../cwcs.json';

const CommunitySearchPage = () => {
    const [inputText, setInputText] = useState("");
    const [tableData, setTableData] = useState([]);
    let inputHandler = (e) => {
        var lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase);
    };
    const columns = React.useMemo(() => [
        {
            Header: "Region",
            accessor: "REGION",
            width: 200,
            minWidth: 200,
            maxWidth: 200,
        },
        {
            Header: "State",
            accessor: "STATE",
            width: 100,
            minWidth: 100,
            maxWidth: 100,
        },
        {
            Header: "CWCS",
            accessor: "CWCS",
            width: 300,
            minWidth: 300,
            maxWidth: 300,
        }
    ], []);
    useEffect(() => {
        setTableData(CwcsData);
    }, []);
    return(
        <div className='CommunitySearchPage'>
            <h1>Community Search</h1>
            <div class="flexbox-container">
                <div class="search-container">
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
                <div class="button">
                    <Dropdown>
                        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                            Population
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">&lt; 10,000</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">10,000 - 100,000</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">&gt; 100,000</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
            <CommunityTable columns={columns} data={tableData} input={inputText} />             
        </div>
    );
}

export default CommunitySearchPage;
