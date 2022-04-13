import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';
import swal from 'sweetalert';

function EditSalemanager() {
  const [salemanagerInput, setSalemanager] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);

  const {id} = useParams();
  const navigate = useNavigate();

  const category_id = id;

  useEffect(() => {
    axios.get(`/api/edit-salemanager/${category_id}`).then(res=>{
      if(res.data.status === 200){
        setSalemanager(res.data.category);
      }
      else if(res.data.status === 404){
        swal('Error',res.data.message,'error')
        navigate('/admin/view-salemanager')
      }
      setTimeout(() => {
        setLoading(false);
      }, 2500);
    });
  }, [id])

  const handleInput = (e) => {
    e.persist();
    setSalemanager({...salemanagerInput, [e.target.name]: e.target.value})
  }

  const updateCategory = (e) => {
    e.preventDefault();
    const data = salemanagerInput;
    axios.put(`/api/update-salemanager/${category_id}`,data).then(res =>{
      if(res.data.status===200){
        swal('Success',res.data.message,"success");
        setError([])
        navigate('/admin/view-salemanager')
      }else if(res.data.status===422){
        swal('All Fields Are Mandatory',"","error");
        setError(res.data.errors)
      }else if(res.data.status===404){
        swal('Error',res.data.message,"error");
        navigate('/admin/view-salemanager')
      }
    })
  }

  if(loading){
    return <div className='myStyle'>
    <FadeLoader className='myStyleLoad'/>
    </div>
  }
  return (
    <div className='cards'>
        <div className='card shadow w-75'>
            <div className='card-header text-center bg-success'>
            <h3 className='fw-bold'>Update SalesManager</h3>
            </div>
            <div className='card-body bg-light'>
            <form onSubmit={updateCategory}>
            <div className='form-group'>
                <label>Name</label>
                <input type='text' name='name'  value={salemanagerInput.name} onChange={handleInput} className='form-control'/>
                <span className='text-black'>{error.name}</span>
            </div>
            <div className='form-group mt-2'>
                <label>Email</label>
                <input type='email' name='email'  value={salemanagerInput.email} onChange={handleInput} className='form-control'/>
                <span className='text-black'>{error.email}</span>
            </div>
            <div className='form-group mt-4 text-center'>
                <input type='submit' className='btn btn-dark' value="Update"/>
            </div>
            </form>
            </div>
        </div>
        </div>
  )
}

export default EditSalemanager