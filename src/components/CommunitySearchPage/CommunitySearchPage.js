import React, { useEffect, useState } from 'react';
import TextField from "@mui/material/TextField";

import Dropdown from 'react-bootstrap/Dropdown';

import './CommunitySearchPage.css';
import CommunityTable from './CommunityTable';
import HeaderBanner from '../HeaderBanner/HeaderBanner';

const CommunitySearchPage = () => {
    const [message, setMessage] = useState("");
    const [inputText, setInputText] = useState("");
    const [tableData, setTableData] = useState([]);
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
            accessor: "poverty",
        }
    ], []);
    useEffect(() => {
        fetch("http://127.0.0.1:5000/features/get-all", {
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
    }, []);
    return(
        <div>
            <HeaderBanner header={"Community Search"}/>        
            <div className='CommunitySearchPage'>
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
                                <Dropdown.Item href="#/action-1">&lt; 10,000</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">10,000 - 100,000</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">&gt; 100,000</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
                <CommunityTable columns={columns} data={tableData} input={inputText} />             
            </div>
        </div>
    );
}

export default CommunitySearchPage;
