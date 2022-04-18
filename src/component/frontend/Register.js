import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import Navbar from '../../layouts/frontend/Navbar'
import axios from 'axios'
import swal from 'sweetalert'
import {useNavigate} from 'react-router-dom'
import { faBook, faEnvelope, faKey, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Register = () => {

  const navigate = useNavigate();

  const [registerInput, setRegister] = useState({
    name:'',
    email:'',
    password:'',
    error_list:[],
  });

  const handleInput = (e) =>{
    e.persist();
    setRegister({...registerInput,[e.target.name]:e.target.value})
  }

  const registerSubmit = (e) =>{
    e.preventDefault();

    const data = {
      name: registerInput.name,
      email: registerInput.email,
      password: registerInput.password,
    }

    axios.get('/sanctum/csrf-cookie').then(response => {
    axios.post(`/api/register`,data).then(res => {
        if(res.data.status === 200){
          localStorage.setItem('auth_token',res.data.token);
          localStorage.setItem('auth_name',res.data.username);
          localStorage.setItem('auth_id',res.data.id);
          localStorage.setItem('auth_type',res.data.role);
          swal("Success",res.data.message,"success");
          navigate('/');  
        }else{
          setRegister({...registerInput,error_list: res.data.validation_errors})
        }
      });
    });
  }

  return (
    <>
    <Navbar />
    <div className='bodyContainer'>
    <img className='Loginimg' src={process.env.PUBLIC_URL+'/loginBge.jpg'} width ="100%" alt='bro' />
      <div className='loginContainer container-fluid'>
        <div className='row loginRaw justify-content-center h-100 mx-5 my-5'>
          <div className='loginSecond shadow col-lg-5'>
          <h1 className='looginHead'>Book Store Register <FontAwesomeIcon className='fa fa-1x' icon={faBook}/></h1>
          <form onSubmit={registerSubmit}>
          <div className='form-group mb-3'>
            <label className='loginLabel'>Full Name <FontAwesomeIcon icon={faUser}/></label>
            <input className='form-control' value={registerInput.name} onChange={handleInput}  type="text" name="name" />
            <span>{registerInput.error_list.name}</span>
          </div>
          <div className='form-group mb-3'>
            <label className='loginLabel'>Email <FontAwesomeIcon icon={faEnvelope}/></label>
            <input className='form-control' value={registerInput.email} onChange={handleInput}  type="email" name="email" />
            <span>{registerInput.error_list.email}</span>
          </div>
          <div className='form-group mb-3'>
            <label className='loginLabel'>Password <FontAwesomeIcon icon={faKey}/></label>
            <input className='form-control' value={registerInput.password} onChange={handleInput}  type="password" name="password" />
            <span>{registerInput.error_list.password}</span>
          </div>
          <div className='form-group text-center mb-3'>
            <button type='submit' className='btn text-white loginBtn'>Register</button>
          </div>
        </form>
          </div>  
        </div>
    </div>
    </div>
    </>
  )
}

export default Register