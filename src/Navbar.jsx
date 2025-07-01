import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export const Navbar = () => {
  return (
    <div>
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container">
    <a class="navbar-brand" href="#">Class Code</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
        <li class="nav-item">
         <Link to='/adminhome' class="nav-link active">Home</Link>
        </li>
        <li class="nav-item">
         <Link to='/createbatch' class="nav-link">Create Batch</Link>
        </li>
        <li class="nav-item">
         <Link to='/uploadlesson' class="nav-link">Create Lesson</Link>
        </li>
        <li class="nav-item">
         <Link to='/viewlesson' class="nav-link">View Lesson</Link>
        </li>
        <li class="nav-item">
         <Link to='/adminlogin' class="nav-link">Logout</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
<Outlet></Outlet>
    </div>
  )
}
