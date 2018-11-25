import React from "react";
import { Link } from "react-router-dom";

const NavTabs = () => (
    <ul className="navbar-nav mr-auto">

        <li className="nav-item">
            <Link to="/tasks" className="nav-link">Task List</Link>
        </li>

        <li className="nav-item">
            <Link to="/chat" className="nav-link">Team Chat</Link>
        </li>

        {/* <li className="nav-item">
            <Link to="/repair" className="nav-link">Repair Guide</Link>
        </li> */}

        <li className="nav-item">
            <Link to="/orders" className="nav-link">Orders</Link>
        </li>

        <li className="nav-item">
            <Link to="/admin" className="nav-link">Admin</Link>
        </li>

    </ul>
)

export default NavTabs;