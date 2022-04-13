import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { FadeLoader } from 'react-spinners';
import swal from 'sweetalert';

function EditBooks() {
    const {id} = useParams();
    const navigate = useNavigate();
  
  const category_id = id;
  const [categorylist, setCategorylist] = useState([]);
  const [updateInput, setUpdate] = useState([]);

  const [errors, setError] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`/api/edit-books/${category_id}`).then(res=>{
      if(res.data.status === 200){
        setUpdate(res.data.booksData);
      }
      else if(res.data.status === 404){
        swal('Error',res.data.message,'error')
        navigate('/author/view-books')
      }
        setLoading(false);
    });
  }, [id])

  useEffect(() => {
    axios.get(`/api/all-category`).then(res=>{
      if(res.data.status === 200){
        setCategorylist(res.data.category);
      }
    });
  }, [])

  const handleInput = (e) => {
    e.persist();
    setUpdate({...updateInput,[e.target.name]:e.target.value})
  }

  const updateSubmit = (e) => {
    e.preventDefault();
    const data = updateInput;
    axios.put(`/api/update-books/${category_id}`,data).then(res =>{
      if(res.data.status===200){
        swal('Success',res.data.message,"success");
        setError([])
        navigate('/author/view-books')
      }else if(res.data.status===422){
        swal('All Fields Are Mandatory',"","error");
        setError(res.data.errors)
      }else if(res.data.status===404){
        swal('Error',res.data.message,"error");
        navigate('/author/view-books')
      }
    })
  }

  if(loading){
    return <div className='myStyle'>
    <FadeLoader className='myStyleLoad'/>
    </div>
  }
  return (
    <div className='container-fluid px-4'>
      <div className='card mt-4'>
        <div className='card-header fw-bold'>
          <h4>Add Books
          <Link to="/author/view-books" className='viewAdd'>View Books</Link></h4>
        </div>
        <div className='card-body'>
        <form encType='multipart/form-data' onSubmit={updateSubmit}>
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link" id="seotags-tab" data-bs-toggle="tab" data-bs-target="#seotags" type="button" role="tab" aria-controls="seotags" aria-selected="false">SEO</button>
            </li>
          </ul>
          <div className="tab-content" id="myTabContent">
            <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
              <div className='form-group mb-3'>
                <label>Select Category</label>
                <select name='category_id' onChange={handleInput} value={updateInput.category_id} className='form-control'>
                <option>Select Category</option>
                {
                  categorylist.map((item) => {
                    return(
                      <option value={item.id} key={item.id}>{item.name}</option>
                    )
                  })
                }
                </select>
                <span className='text-center'>{errors.category_id}</span>
              </div>
              <div className='form-group mb-3'>
                <label>Slug</label>
                <input type='text' name='slug' onChange={handleInput} value={updateInput.slug} className='form-control' />
                <span className='text-center'>{errors.slug}</span>
              </div>
              <div className='form-group mb-3'>
                <label>Book Name</label>
                <input type='text' name='name' onChange={handleInput} value={updateInput.name} className='form-control' />
                <span className='text-center'>{errors.name}</span>
              </div>
              <div className='form-group mb-3'>
                <label>About Book</label>
                <textarea name='description' onChange={handleInput} value={updateInput.description} className='form-control'></textarea>
                <span className='text-center'>{errors.description}</span>
              </div>
            </div>
            <div className="tab-pane card-body border fade" id="seotags" role="tabpanel" aria-labelledby="seotags-tab">
              <div className='form-group mb-3'>
                <label>Meta Title</label>
                <input type='text' name='meta_title' onChange={handleInput} value={updateInput.meta_title} className='form-control' />
                <span className='text-center'>{errors.meta_title}</span>
              </div>
              <div className='form-group mb-3'>
                <label>Meta Keyword</label>
                <input type='text' name='meta_key' onChange={handleInput} value={updateInput.meta_key} className='form-control' />
                <span className='text-center'>{errors.meta_key}</span>
              </div>
              <div className='form-group mb-3'>
                <label>Meta Description</label>
                <textarea name='meta_descrip' onChange={handleInput} value={updateInput.meta_descrip} className='form-control'></textarea>
                <span className='text-center'>{errors.meta_descrip}</span>
              </div>
            </div>
          </div>
          <button type='submit' className='btn btn-primary px-4 float-end mt-2'>Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditBooks