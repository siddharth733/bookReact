import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';
import swal from 'sweetalert';


function EditCategory() {
  const [categoryInput, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);

  const {id} = useParams();
  const navigate = useNavigate();

  const category_id = id;

  useEffect(() => {
    axios.get(`/api/edit-category/${category_id}`).then(res=>{
      if(res.data.status === 200){
        setCategory(res.data.category);
      }
      else if(res.data.status === 404){
        swal('Error',res.data.message,'error')
        navigate('/admin/view-category')
      }
      setTimeout(() => {
        setLoading(false);
      }, 2500);
    });
  }, [id])

  const handleInput = (e) => {
    e.persist();
    setCategory({...categoryInput, [e.target.name]: e.target.value})
  }

  const updateCategory = (e) => {
    e.preventDefault();
    const data = categoryInput;
    axios.put(`/api/update-category/${category_id}`,data).then(res =>{
      if(res.data.status===200){
        swal('Success',res.data.message,"success");
        setError([])
        navigate('/admin/view-category')
      }else if(res.data.status===422){
        swal('All Fields Are Mandatory',"","error");
        setError(res.data.errors)
      }else if(res.data.status===404){
        swal('Error',res.data.message,"error");
        navigate('/admin/view-category')
      }
    })
  }

  if(loading){
    return <div className='myStyle'>
    <FadeLoader className='myStyleLoad'/>
    </div>
  }

  return (
    <div className='container-fluid text-white px-5'>
      <h1 className='mt-4 catrgoryHead'>Edit Category</h1>
      <form onSubmit={updateCategory} id='CATEGORY_FORM'>
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#seo-tags" type="button" role="tab" aria-controls="seo-tags" aria-selected="false">SEO Tags</button>
          </li>
        </ul>
        <div className="tab-content shadow" id="myTabContent">
          <div className="tab-pane card-body CategoryBorder fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
            <div className='form-group mb-3'>
              <label className='text-black'>Slug</label>
              <input type="text" name='slug' onChange={handleInput} value={categoryInput.slug} className='form-control' />
              <span className='text-black'>{error.slug}</span>
            </div>
            <div className='form-group mb-3'>
              <label className='text-black'>Name</label>
              <input type="text" name='name' onChange={handleInput} value={categoryInput.name} className='form-control' />
              <span className='text-black'>{error.name}</span>
            </div>
            <div className='form-group mb-3'>
              <label className='text-black'>Description</label>
              <textarea name='description' onChange={handleInput} value={categoryInput.description} className='form-control'></textarea>
              <span className='text-black'>{error.description}</span>
            </div>
          </div>
          <div className="tab-pane card-body CategoryBorder fade" id="seo-tags" role="tabpanel" aria-labelledby="seo-tags-tab">
            <div className='form-group mb-3'>
              <label className='text-black'>Meta Title</label>
              <input type="text" name='meta_title' onChange={handleInput} value={categoryInput.meta_title} className='form-control' />
              <span className='text-black'>{error.meta_title}</span>
            </div>
            <div className='form-group mb-3'>
              <label className='text-black'>Meta Keyword</label>
              <input type="text" name='meta_keyword' onChange={handleInput} value={categoryInput.meta_keyword} className='form-control' />
              <span className='text-black'>{error.meta_keyword}</span>
            </div>
            <div className='form-group mb-3'>
              <label className='text-black'>Meta Description</label>
              <textarea name='meta_descrip' onChange={handleInput} value={categoryInput.meta_descrip} className='form-control'></textarea>
              <span className='text-black'>{error.meta_descrip}</span>
            </div>
          </div>
        </div>
        <button type='submit' className='btn btn-primary mt-3 px-4 float-end'>Update</button>
      </form>
    </div>
  )
}

export default EditCategory