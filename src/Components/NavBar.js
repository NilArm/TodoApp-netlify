import React from "react";
import './css/NavBar.css'
import InfoIcon from "./InfoIcon";

function NavBar(){

    return(
        <div className="bodyOfNavBar">
            <ul className="navFlex">
            <li className="navItem logo">Todo</li>
                <li className="navItem">
                    <ul className="navFlex">
                        <li className="navItem"><InfoIcon/></li>
                    </ul>
                </li>
            </ul>
        </div>
    )
}

export default NavBar