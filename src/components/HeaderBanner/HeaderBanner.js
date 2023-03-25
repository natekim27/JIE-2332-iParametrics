import React from "react";

import './HeaderBanner.css';

const HeaderBanner = ({header}) => {
    return (
        <div className="header-banner">
        <div className='garamond'><h2><b>iParametrics</b></h2></div>
        {header ? <div className="gill-sans"><p>{header}</p></div> : <></>}
        </div>
    );
};

export default HeaderBanner;