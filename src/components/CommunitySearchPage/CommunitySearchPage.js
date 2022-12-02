import React, { useEffect, useState } from 'react';
import TextField from "@mui/material/TextField";

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
    for (var i in CwcsData) 
    useEffect(() => {
        setTableData(CwcsData);
      }, []);
    return(
        <div className='CommunitySearchPage'>
            <h1>Community Search</h1>
            <div className="search">
                <TextField
                id="outlined-basic"
                onChange={inputHandler}
                variant="outlined"
                fullWidth
                label="Search"
                />
            </div>
            <CommunityTable columns={columns} data={tableData} input={inputText} />             
        </div>
    );
}

export default CommunitySearchPage;
