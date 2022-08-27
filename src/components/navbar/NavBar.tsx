import React from 'react';
import {NavLink} from "react-router-dom";
import './navbar.css'
const NavBar = () => {
    return (
        <div className={"navbar_section"}>
            <NavLink to={"/translate"} className={'navbar_links'}>Translate</NavLink>
            <NavLink to={"/history"} className={'navbar_links'}>History</NavLink>
        </div>
    );
};

export default NavBar;
