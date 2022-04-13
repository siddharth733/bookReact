import axios from 'axios';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import swal from 'sweetalert';

const Navbar = () => {

    const navigate = useNavigate();
    const logoutSubmit = (e) => {
        e.preventDefault();
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/api/logout`).then(res => {
                if (res.data.status === 200) {
                    localStorage.removeItem('auth_token', res.data.token);
                    localStorage.removeItem('auth_name', res.data.username);
                    localStorage.removeItem('auth_id', res.data.id);
                    localStorage.removeItem('auth_type', res.data.role);
                    navigate('/login');
                    swal("Success", res.data.message, "success");
                }
            });
        });
    }

    var AuthButtons = '';
    if (!localStorage.getItem(`auth_token`)) {
        AuthButtons = (
            <ul className='navbar-nav'>
                <li className="nav-item" >
                    <Link className="NavTitle active" aria-current="page" to="/login">Login</Link>
                </li >
                <li className="nav-item">
                    <Link className="NavTitle active" aria-current="page" to="/register">Register</Link>
                </li>
            </ul>
        )
    } else {
        AuthButtons = (
            <ul className='navbar-nav'>
                <li className="nav-item">
                    <Link className="NavTitle active" aria-current="page" to="/faviourate">Faviourate</Link>
                </li>
                <li className="nav-item">
                    <Link className="NavTitle active" aria-current="page" to="/profile">Profile</Link>
                </li>
                <li className="nav-item">
                    <Link className="NavTitle active" onClick={logoutSubmit} aria-current="page" to='/login'>Logout</Link>
                </li>
            </ul>
        )
    }

    var AuthDash = '';
    if (localStorage.getItem(`auth_type`) === 'admin') {
        AuthDash = (
            <ul className='navbar-nav'>
                <li className="nav-item">
                    <Link className="NavTitle active" aria-current="page" to="/admin/dashboard">Dashboard</Link>
                </li>
            </ul>
        )
    }else if(localStorage.getItem(`auth_type`) === 'manager') {
        AuthDash = (
            <ul className='navbar-nav'>
                <li className="nav-item">
                    <Link className="NavTitle active" aria-current="page" to="/manager/dashboard">Dashboard</Link>
                </li>
            </ul>
        )
    }else if (localStorage.getItem(`auth_type`) === 'author') {
        AuthDash = (
            <ul className='navbar-nav'>
                <li className="nav-item">
                    <Link className="NavTitle active" aria-current="page" to="/author/dashboard">Dashboard</Link>
                </li>
            </ul>
        )
    }

    return (
        <>
            <nav className="navbar navbarFirst navbar-expand-lg navbar-light shadow sticky-top">
                <div className="container">
                    <Link className="NavHead" to="#">Book Store</Link>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="NavTitle active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="NavTitle active" aria-current="page" to="/category">Category</Link>
                            </li>
                            {AuthDash}
                            {AuthButtons}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar