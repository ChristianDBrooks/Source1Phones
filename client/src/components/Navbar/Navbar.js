import React from "react";
import NavTabs from "./NavTabs.js"

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
    <a className="navbar-brand ml-5">Source1Phones</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01"
      aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarColor01">
      <NavTabs />

      <div className="mr-5">
        <img src="https://via.placeholder.com/40x40" alt="Not-Found.jpg" className="rounded-circle mx-2" />
        <i className="fas fa-bars fa-lg mr-1"></i>
      </div>
    </div>
  </nav>
);

export default Navbar;