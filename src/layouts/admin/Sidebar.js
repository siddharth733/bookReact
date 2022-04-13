import React from 'react'
import { Link } from 'react-router-dom'
const Sidebar = () => {
    return (
        <nav className="adminSid sb-sidenav accordion sb-sidenav-dark shadow" id="sidenavAccordion">
            <div className="sb-sidenav-menu">
                <div className="nav">
                    <div className="sb-sidenav-menu-heading"></div>
                    <Link className="linkSid" to="../admin/dashboard">
                        <div className="sb-nav-link-icon"><i className="fas fa-home fa-tachometer-alt"></i></div>
                        Dashboard
                    </Link>
                    <Link className="linkSid" to="../admin/add-category">
                        <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                        Add Category
                    </Link>
                    <Link className="linkSid" to="../admin/view-category">
                        <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                        View Category
                    </Link>
                    <Link className="linkSid" to="../admin/add-salemanager">
                        <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                        Add SalesManager
                    </Link>
                    <Link className="linkSid" to="../admin/view-salemanager">
                        <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                        View SalesManager
                    </Link>
                    <Link className="linkSid" to="../admin/view-work">
                        <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                        View SalesManager Work
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default Sidebar