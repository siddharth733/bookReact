import React from 'react'
import {Link} from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="adminFoot shadow py-4 mt-auto">
            <div className="container-fluid px-4">
                <div className="d-flex align-items-center justify-content-between small">
                    <div className="text-muted ms-auto">Copyright &copy; Your Website 2022</div>
                </div>
            </div>
        </footer>
    )
}

export default Footer