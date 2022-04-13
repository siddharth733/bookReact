import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

function AddAuthor() {
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

  const registerSalesman = (e) =>{
    e.preventDefault();

    const data = {
      name: registerInput.name,
      email: registerInput.email,
      password: registerInput.password,
    }

    axios.post(`/api/register-author`,data).then(res => {
        if(res.data.status === 200){
          swal("Success",res.data.message,"success");
        }else{
          setRegister({...registerInput,error_list: res.data.validation_errors})
        }
      });
  }
  return (
    <>
        <div className='cards'>
        <div className='card shadow w-75'>
            <div className='card-header text-center bg-success'>
            <h3 className='fw-bold'>Add Author</h3>
            </div>
            <div className='card-body bg-light'>
            <form onSubmit={registerSalesman}>
            <div className='form-group'>
                <label>Name</label>
                <input type='text' name='name'  value={registerInput.name} onChange={handleInput} className='form-control'/>
                <span>{registerInput.error_list.name}</span>
            </div>
            <div className='form-group mt-2'>
                <label>Email</label>
                <input type='email' name='email'  value={registerInput.email} onChange={handleInput} className='form-control'/>
            <span>{registerInput.error_list.email}</span>
            </div>  
            <div className='form-group mt-2'>
                <label>Password</label>
                <input type='password' name='password'  value={registerInput.password} onChange={handleInput} className='form-control'/>
            <span>{registerInput.error_list.password}</span>

            </div>
            <div className='form-group mt-4 text-center'>
                <input type='submit' className='btn btn-dark' value="Submit"/>
            </div>
            </form>
            </div>
        </div>
        </div>
    </>
  )
}

export default AddAuthor