import React from "react";
import {InfoOutlineIcon} from '@chakra-ui/icons'
import './css/NavBar.css'
function NavBar(){


    return(
        <div className="bodyOfNavBar">
            <ul className="navFlex">
            <li className="navItem logo">Todo</li>
                <li className="navItem">
                    <ul className="navFlex">
                        <li className="navItem"><InfoOutlineIcon/></li>
                    </ul>
                </li>
            </ul>
        </div>
    )
}

export default NavBar