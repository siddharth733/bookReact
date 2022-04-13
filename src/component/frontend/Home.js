import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import Navbar from '../../layouts/frontend/Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPersonWalkingDashedLineArrowRight, faWheelchairMove } from '@fortawesome/free-solid-svg-icons';


const Home = () => {
  return (
    <div className='bodyContainer'>
    <Navbar/>
    <img className='Loginimg' src={process.env.PUBLIC_URL+'/loginBge.jpg'} width ="100%" height="100%" alt='bro' />
    <div className='loginContainer'>
        <h1 className='textStyle titleErrorss text-center fw-bold'>Welecome User <FontAwesomeIcon className='fa fa-1x' icon={faHome}/></h1>
    </div>
    </div>
  )
}

export default Home
