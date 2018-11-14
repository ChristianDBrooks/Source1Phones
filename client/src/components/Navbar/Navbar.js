import React from "react";

const Navbar = () => (
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow">
    <a class="navbar-brand ml-5" href="#">Source1Phones</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01"
      aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarColor01">
      <ul class="navbar-nav mr-auto">

        <li class="nav-item">
          <a class="nav-link" href="#">About <span class="sr-only">(current)</span></a>
        </li>

        <li class="nav-item">
          <a class="nav-link" href="#">Task List</a>
        </li>

        <li class="nav-item">
          <a class="nav-link" href="#">Team Chat</a>
        </li>

        <li class="nav-item active">
          <a class="nav-link" href="#">Repair Guide</a>
        </li>

      </ul>

      <div class="mr-5">
        <img src="https://via.placeholder.com/40x40" alt="Not-Found.jpg" class="rounded-circle mx-2" />
        <i class="fas fa-bars fa-lg mr-1"></i>
      </div>
    </div>
  </nav>
);