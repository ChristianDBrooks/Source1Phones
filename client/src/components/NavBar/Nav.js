import React, { Component } from "react";
import NavTabs from "./NavTabs.js";
import employeeAPI from "../../utils/api/employeeAPI";
import { Link } from "react-router-dom";

class Nav extends Component {

  logoutUser = (event) => {
    event.preventDefault();

    // Log user with the id in session out in the db.
    employeeAPI.changeEmployeeOnlineStatus(sessionStorage.getItem("currentUserID"), false);

    // Delete the session storage id and user.
    sessionStorage.removeItem("currentUserID")
    sessionStorage.removeItem("currentEmployee")
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark shadow" style={{ backgroundColor: "rgba(0, 0, 0, 0.75)" }}>
        <span onClick={this.logoutUser}>
          <Link to="/" className="navbar-brand ml-5">Source1Phones</Link>
        </span>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01"
          aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarColor01">
          <NavTabs />

          <div className="mr-5">
            <span className="py-2">{sessionStorage.getItem("currentEmployee")}</span>
            <button className="btn btn-secondary btn-sm ml-2" onClick={this.logoutUser}>
              <Link to="/" >LOGOUT</Link>
            </button>
          </div>
        </div>
      </nav>
    );
  }
}

export default Nav;