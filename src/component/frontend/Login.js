import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import Navbar from '../../layouts/frontend/Navbar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faKey } from '@fortawesome/free-solid-svg-icons'

const Login = () => {

  const navigate = useNavigate();

  const [loginInput, setLogin] = useState({
    email:'',
    password:'',
    error_list:[],
  });
  
  const handleInput = (e) =>{
    e.persist();
    setLogin({...loginInput,[e.target.name]:e.target.value});
  }

  const loginSubmit = (e) => {
    e.preventDefault();
    
    const data = {
      email:loginInput.email,
      password:loginInput.password,
    }

    axios.get('/sanctum/csrf-cookie').then(response => {
    axios.post(`api/login`,data).then(res =>{
      if(res.data.status === 200){
        localStorage.setItem('auth_token',res.data.token);
        localStorage.setItem('auth_name',res.data.username);
        localStorage.setItem('auth_id',res.data.id);
        localStorage.setItem('auth_type',res.data.role);
        swal("Success",res.data.message,"success");
        if(res.data.role === 'admin'){
        navigate('/admin/dashboard');
        }
        else if(res.data.role === 'manager'){
        navigate('/manager/dashboard');
        }
        else if(res.data.role === 'author'){
        navigate('/author/dashboard');
        }else{
        navigate('/');
        }
      }else if(res.data.status === 401){
        swal("Warning",res.data.message,"warning");
      }else{
        setLogin({...loginInput,error_list: res.data.validation_errors})
      }
    });
  });
  }

  return (
    <>
    <Navbar/>
    <div className='bodyContainer'>
      <img className='Loginimg' src={process.env.PUBLIC_URL+'/loginBge.jpg'} width ="100%" alt='bro' />
      <div className='loginContainer'>
          <div className='row loginRaw justify-content-center h-100'>
            <div className='loginSecond shadow col-lg-4'>
            <h1 className='looginHead'>Book Store Login <FontAwesomeIcon className='fa fa-1x' icon={faBook}/></h1>
                  <form onSubmit={loginSubmit}>
                    <div className='form-group mb-3'>
                      <label className='loginLabel'>Email <FontAwesomeIcon icon={faEnvelope}/></label>
                      <input className='loginTxt form-control' onChange={handleInput} value={loginInput.email} type="email" name="email" />
                      <span>{loginInput.error_list.email}</span>
                    </div>
                    <div className='form-group mb-3'>
                      <label className='loginLabel'>Password <FontAwesomeIcon icon={faKey} /></label>
                      <input className='loginTxt form-control' onChange={handleInput} value={loginInput.password} type="password" name="password" />
                      <span>{loginInput.error_list.password}</span>
                    </div>
                    <div className='form-group text-center mb-3'>
                      <button type='submit' className='btn text-white loginBtn'>Login</button>
                    </div>
                  </form>
                  
            </div>  
          </div>
      </div>
    </div>
    </>
  )
}

export default Login