import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

import '../../assets/admin/css/styles.css'
import '../../assets/admin/js/scripts'
import { useParams } from 'react-router-dom'
import AddBooks from '../../component/author/books/AddBook'
import ViewBooks from '../../component/author/books/ViewBook'
import EditBooks from '../../component/author/books/EditBooks'
import Dashboard from '../../component/author/Dashboard'


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
                <div id="layoutSidenav_content" className='shadow mainAdmin'>
                    <main>
                    {type === 'add-books' && <AddBooks />}
                    {type === 'view-books' && <ViewBooks />}
                    {type === 'edit-books' && id===id  && <EditBooks />}
                    {type === 'dashboard' && <Dashboard />}
                    </main>
                    <Footer />
                </div>
            </div>
        </div>
    )
}

export default MasterLayout