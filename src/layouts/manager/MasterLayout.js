import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

import '../../assets/admin/css/styles.css'
import '../../assets/admin/js/scripts'
import Dashboard from '../../component/manager/Dashboard'
import AddAuthor from '../../component/manager/AddAuthor'
import ViewAuthor from '../../component/manager/ViewAuthor'
import EditAuthor from '../../component/manager/EditAuthor'
import { useParams } from 'react-router-dom'
import ViewWork from '../../component/manager/ViewWork'


  const pathname = window.location.pathname;

const MasterLayout = () => {
    const {type} = useParams();
    const {id} = useParams();
    return (
        <div className="sb-nav-fixed">
            <Navbar />
            <div id="layoutSidenav">
                <div id="layoutSidenav_nav">
                    <Sidebar />
                </div>
                <div id="layoutSidenav_content" className='mainAdmin'>
                    <main>
                    {type === 'dashboard' && <Dashboard />}
                    {type === 'add-author' && <AddAuthor/>}
                    {type === 'view-author' && <ViewAuthor/>}
                    {type == 'edit-author' && id==id  && <EditAuthor/>}
                    {type === 'view-work' && <ViewWork/>}
                    </main>
                    <Footer />
                </div>
            </div>
        </div>
    )
}

export default MasterLayout