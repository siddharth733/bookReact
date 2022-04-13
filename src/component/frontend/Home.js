import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import Navbar from '../../layouts/frontend/Navbar'
import { useParams } from 'react-router-dom'
import HomeCategory from './homeFrontend/HomeCategory'
import ViewBooks from './homeFrontend/ViewBooks'
import BookDetail from './homeFrontend/BookDetail'


const Home = () => {
  return (
    <div className='bodyContainer'>
    <Navbar/>
    <img className='Loginimg' src={process.env.PUBLIC_URL+'/loginBge.jpg'} width ="100%" height="100%" alt='bro' />
    <div className='loginContainer'>
        <h1 className='textStyle text-center text-success display-1 fw-bold'>Welecome</h1>
    </div>
    </div>
  )
}

export default Home
