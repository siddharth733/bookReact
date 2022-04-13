import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import swal from 'sweetalert';


function AddBook() {
  const navigate = useNavigate();
  const [categorylist, setCategorylist] = useState([]);
  const [productInput, setProduct] = useState({
    category_id:'',
    slug:'',
    name:'',
    description:'',
    meta_title:'',
    meta_keyword:'',
    meta_descrip:'',
    author_id:localStorage.getItem('auth_id'),
  });

  const [picture, setPicture] = useState([])
  const [filesData, setFile] = useState([])
  const [errors, setError] = useState([])

  const handleInput = (e) => {
    e.persist();
    setProduct({...productInput,[e.target.name]:e.target.value})
  }
  const handleImage = (e) => {
    setPicture({image: e.target.files[0]})
  }
  const handleFile = (e) => {
    setFile({file: e.target.files[0]})
  }
  useEffect(() => {
    axios.get(`/api/all-category`).then(res=>{
      if(res.data.status === 200){
        setCategorylist(res.data.category);
      }
    });
  }, [])

  const submitBook = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image',picture.image)
    formData.append('file',filesData.file)
    formData.append('category_id',productInput.category_id)
    formData.append('slug',productInput.slug)
    formData.append('name',productInput.name)
    formData.append('description',productInput.description)
    formData.append('meta_title',productInput.meta_title)
    formData.append('meta_keyword',productInput.meta_keyword)
    formData.append('meta_descrip',productInput.meta_descrip)
    formData.append('author_id',productInput.author_id)
    axios.post(`/api/store-books`,formData).then(res =>{
      if(res.data.status === 200){
        swal('Success',res.data.message,'success');
        setError([]);
        navigate('/author/view-books');
      } else if(res.data.status === 422){
        swal('All Field Are Mandetory','','error')
        setError(res.data.errors);
      }
    })
}

  return (
    <div className='container-fluid px-4'>
      <div className='card mt-4'>
        <div className='card-header fw-bold'>
          <h4>Add Books
          <Link to="/author/view-books" className='viewAdd'>View Books</Link></h4>
        </div>
        <div className='card-body'>
        <form onSubmit={submitBook} encType='multipart/form-data'>
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link" id="seotags-tab" data-bs-toggle="tab" data-bs-target="#seotags" type="button" role="tab" aria-controls="seotags" aria-selected="false">SEO</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link" id="otherdetail-tab" data-bs-toggle="tab" data-bs-target="#otherdetail" type="button" role="tab" aria-controls="contact" aria-selected="false">Files</button>
            </li>
          </ul>
          <div className="tab-content" id="myTabContent">
            <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
              <div className='form-group mb-3'>
                <label>Select Category</label>
                <select name='category_id' onChange={handleInput} value={productInput.category_id} className='form-control'>
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
                <input type='text' name='slug' onChange={handleInput} value={productInput.slug} className='form-control' />
                <span className='text-center'>{errors.slug}</span>
              </div>
              <div className='form-group mb-3'>
                <label>Book Name</label>
                <input type='text' name='name' onChange={handleInput} value={productInput.name} className='form-control' />
                <span className='text-center'>{errors.name}</span>
              </div>
              <div className='form-group mb-3'>
                <label>About Book</label>
                <textarea name='description' onChange={handleInput} value={productInput.description} className='form-control'></textarea>
                <span className='text-center'>{errors.description}</span>
              </div>
            </div>
            <div className="tab-pane card-body border fade" id="seotags" role="tabpanel" aria-labelledby="seotags-tab">
              <div className='form-group mb-3'>
                <label>Meta Title</label>
                <input type='text' name='meta_title' onChange={handleInput} value={productInput.meta_title} className='form-control' />
                <span className='text-center'>{errors.meta_title}</span>
              </div>
              <div className='form-group mb-3'>
                <label>Meta Keyword</label>
                <input type='text' name='meta_keyword' onChange={handleInput} value={productInput.meta_keyword} className='form-control' />
                <span className='text-center'>{errors.meta_keyword}</span>
              </div>
              <div className='form-group mb-3'>
                <label>Meta Description</label>
                <textarea name='meta_descrip' onChange={handleInput} value={productInput.meta_descrip} className='form-control'></textarea>
                <span className='text-center'>{errors.meta_descrip}</span>
              </div>
            </div>
            <div className="tab-pane card-body border fade" id="otherdetail" role="tabpanel" aria-labelledby="otherdetail-tab">
              <div className='form-group mb-3'>
                <label>Select Image</label>
                <input type='file' name='image' onChange={handleImage} className='form-control' />
                <span className='text-center'>{errors.image}</span>
              </div>
              <div className='form-group mb-3'>
                <label>Select File</label>
                <input type='file' name='file' onChange={handleFile} className='form-control' />
                <span className='text-center'>{errors.file}</span>
              </div>
              <div className='form-group mb-3'>
                <input type='hidden' name='author_id' onChange={handleInput} value={localStorage.getItem('auth_id')} className='form-control' />
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

export default AddBook