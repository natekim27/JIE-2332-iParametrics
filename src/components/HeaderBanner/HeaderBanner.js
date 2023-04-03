import React from "react";

import './HeaderBanner.css';

import iP_LogoMark_white from './iP_LogoMark_white.png';
import iPlogo_white from './iP-logo_white.png';

const HeaderBanner = ({header}) => {
    return (
        <div className="header-banner">
            <div className='garamond'>
                <img src={iPlogo_white}></img>
            </div>
            {header ? <div className="font-face-gs"><h4>{header}</h4></div> : <></>}
        </div>
    );
};

export default HeaderBanner;