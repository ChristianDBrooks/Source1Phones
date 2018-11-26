import React from "react";
import { Link } from "react-router-dom";

const NavTabs = () => (
    <ul className="navbar-nav mr-auto">

        {window.location.pathname === "/tasks" ?
            (
            <li className="nav-item active">
                <Link to="/tasks" className="nav-link">Task List</Link>
            </li>
            ) :
            (
            <li className="nav-item">
                <Link to="/tasks" className="nav-link">Task List</Link>
            </li>
            )
        }

        {window.location.pathname === "/chat" ?
            (
            <li className="nav-item active">
                <Link to="/chat" className="nav-link">Team Chat</Link>
            </li>
            ) :
            (
            <li className="nav-item">
                <Link to="/chat" className="nav-link">Team Chat</Link>
            </li>
            )
        }

        {window.location.pathname === "/orders" ?
            (
            <li className="nav-item active">
                <Link to="/orders" className="nav-link">View Orders</Link>
            </li>
            ) :
            (
            <li className="nav-item">
                <Link to="/orders" className="nav-link">View Orders</Link>
            </li>
            )
        }


        {window.location.pathname === "/admin" ?
            (
                <li className="nav-item active">
                <Link to="/admin" className="nav-link">Admin Dashboard</Link>
            </li>
            ) :
            (
                <li className="nav-item">
                <Link to="/admin" className="nav-link">Admin Dashboard</Link>
            </li>
            )
        }

        {/* <li className="nav-item">
            <Link to="/repair" className="nav-link">Repair Guide</Link>
        </li> */}

    </ul>
)

export default NavTabs;