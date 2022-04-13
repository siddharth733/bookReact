import React from 'react'
import { Link } from 'react-router-dom'
const Sidebar = () => {
    return (
        <nav className="adminSid sb-sidenav accordion sb-sidenav-dark shadow" id="sidenavAccordion">
            <div className="sb-sidenav-menu">
                <div className="nav">
                    <div className="sb-sidenav-menu-heading"></div>
                    <Link className="linkSid" to="../manager/dashboard">
                        <div className="sb-nav-link-icon"><i className="fas fa-home fa-tachometer-alt"></i></div>
                        Dashboard
                    </Link>
                    <Link className="linkSid" to="../manager/add-author">
                        <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                        Add Author
                    </Link>
                    <Link className="linkSid" to="../manager/view-author">
                        <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                        View Author
                    </Link>
                    <Link className="linkSid" to="../manager/view-work">
                        <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                        View Work
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default Sidebar