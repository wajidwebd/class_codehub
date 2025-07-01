import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export const Studentnavbar = () => {
  return (
    <div>
        <nav class="navbar navbar-expand-lg bg-dark">
  <div class="container">
             <Link to="/" className="navbar-brand fw-bold text-warning">
            Class <span className="text-white">Codehub</span>
          </Link>
       <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
        <li class="nav-item">
         <Link to='/' class="nav-link active text-white">Home</Link>
        </li>
        <li class="nav-item">
         <Link to='/login' class="nav-link text-white">Login</Link>
        </li>
        <li class="nav-item">
         <Link to='/adminlogin' class="nav-link text-white">Admin</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
<Outlet></Outlet>
    </div>
  )
}
