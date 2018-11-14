import React from "react";
import NavTabs from "./NavTabs.js"

const Navbar = () => (
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow">
    <a class="navbar-brand ml-5">Source1Phones</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01"
      aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarColor01">
      <NavTabs />

      <div class="mr-5">
        <img src="https://via.placeholder.com/40x40" alt="Not-Found.jpg" class="rounded-circle mx-2" />
        <i class="fas fa-bars fa-lg mr-1"></i>
      </div>
    </div>
  </nav>
);

export default Navbar;