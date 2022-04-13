import React from 'react'
import {Link} from 'react-router-dom'
import {FaHome} from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="adminNav sb-topnav navbar px-4 navbar-expand navbar-dark shadow">
            <b><Link className="adminTitle" to="/admin/dashboard">Author Dashboard</Link></b>
            <Link to="/" className='text-black mb-2 display-6 ms-auto'><FaHome/></Link>
    </nav>
  )
}

export default Navbar