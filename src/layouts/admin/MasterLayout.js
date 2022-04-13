import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

import '../../assets/admin/css/styles.css'
import '../../assets/admin/js/scripts'
import Dashboard from '../../component/admin/Dashboard'
import Profile from '../../component/admin/Profile'
import { useParams } from 'react-router-dom'
import Category from '../../component/admin/Category'
import ViewCategory from '../../component/admin/ViewCategory'
import EditCategory from '../../component/admin/EditCategory'
import AddSalesmanager from '../../component/admin/AddSalesmanager'
import ViewSalesmanager from '../../component/admin/ViewSalesmanager'
import EditSalemanager from '../../component/admin/EditSalemanager'
import ViewSaleWork from '../../component/admin/ViewSaleWork'


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
                    {type === 'profile' && <Profile />}
                    {type === 'add-category' && <Category />}
                    {type === 'view-category' && <ViewCategory />}
                    {type == 'edit-category' && id==id  && <EditCategory />}
                    {type === 'add-salemanager' && <AddSalesmanager/>}
                    {type === 'view-salemanager' && <ViewSalesmanager/>}
                    {type == 'edit-salemanager' && id==id  && <EditSalemanager />}
                    {type === 'view-work' && <ViewSaleWork />}
                    </main>
                    <Footer />
                </div>
            </div>
        </div>
    )
}

export default MasterLayout