import React from "react";
import { Link } from 'react-router-dom';

export default function Header() {
  
  return (
    <>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <Link class="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to="/Sort">Browse Student</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to="/UserForm">Create Profile</Link>
        </li>
      </ul>
      
    </div>
  </div>
</nav>
      
    </>
  );
}
