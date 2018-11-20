import React from "react";
import NavTabs from "./NavTabs.js"
import { Link } from "react-router-dom";

const Navbar = (props) => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
    <a className="navbar-brand ml-5">Source1Phones</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01"
      aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarColor01">
      <NavTabs />

      <div className="mr-5">
            <span className="py-2">{localStorage.getItem("username")}</span>
            <Link to="/" className="btn btn-secondary btn-sm ml-2" onClick={() => {localStorage.setItem("isLoggedIn", "false")}}>LOGOUT</Link>
      </div>
    </div>
  </nav>
);

export default Navbar;