import React from 'react'
import { Link } from 'react-router-dom'
const Sidebar = () => {
    return (
        <nav className="adminSid sb-sidenav accordion sb-sidenav-dark shadow" id="sidenavAccordion">
            <div className="sb-sidenav-menu">
                <div className="nav">
                    <div className="sb-sidenav-menu-heading"></div>
                    <Link className="linkSid ms-3" to="../author/dashboard">
                        <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                        Dashboard
                    </Link>
                    <Link className="linkSid ms-3" to="../author/add-books">
                        <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                        Add Books
                    </Link>
                    <Link className="linkSid ms-3" to="../author/view-books">
                        <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                        View Books
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default Sidebar