import axios from 'axios';
import React, { useState } from 'react'
import swal from 'sweetalert';

function Category() {
    const [categoryInput, setCategory] = useState({
        slug:'',
        name:'',
        descrip:'',
        meta_title:'',
        meta_keyword:'',
        meta_descrip:'',
        error_list:[],
    });

    const handleInput = (e) => {
        e.persist();
        setCategory({...categoryInput,[e.target.name]:e.target.value})
    }

    const submitCategory = (e) => {
        e.preventDefault();
        const data = {
            slug: categoryInput.slug,
            name: categoryInput.name,
            descrip: categoryInput.descrip,
            meta_title: categoryInput.meta_title,
            meta_keyword: categoryInput.meta_keyword,
            meta_descrip: categoryInput.meta_descrip,
        }

        axios.post(`/api/store-category`,data).then(res => {
            if(res.data.status === 200){
                swal('Success',res.data.message,'success');
                document.getElementById('CATEGORY_FORM').reset();
            }else if(res.data.status === 400){
                setCategory({...categoryInput,error_list:res.data.errors})
            }
        });
    }

    return (
        <div className='container-fluid text-white px-5'>
            <h1 className='mt-4 catrgoryHead'>Add Category</h1>
            <form onSubmit={submitCategory} id='CATEGORY_FORM'>
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
                            <span className='text-danger'>{categoryInput.error_list.slug}</span>
                        </div>
                        <div className='form-group mb-3'>
                            <label className='text-black'>Name</label>
                            <input type="text" name='name' onChange={handleInput} value={categoryInput.name} className='form-control' />
                            <span className='text-danger'>{categoryInput.error_list.name}</span>
                        </div>
                        <div className='form-group mb-3'>
                            <label className='text-black'>Description</label>
                            <textarea name='descrip' onChange={handleInput} value={categoryInput.descrip} className='form-control'></textarea>
                            <span className='text-danger'>{categoryInput.error_list.descrip}</span>
                        </div>
                    </div>
                    <div className="tab-pane card-body CategoryBorder fade" id="seo-tags" role="tabpanel" aria-labelledby="seo-tags-tab">
                    <div className='form-group mb-3'>
                            <label className='text-black'>Meta Title</label>
                            <input type="text" name='meta_title'  onChange={handleInput} value={categoryInput.meta_title} className='form-control' />
                            <span className='text-danger'>{categoryInput.error_list.meta_title}</span>
                        </div>
                        <div className='form-group mb-3'>
                            <label className='text-black'>Meta Keyword</label>
                            <input type="text" name='meta_keyword'  onChange={handleInput} value={categoryInput.meta_keyword} className='form-control' />
                            <span className='text-danger'>{categoryInput.error_list.meta_keyword}</span>
                        </div>
                        <div className='form-group mb-3'>
                            <label className='text-black'>Meta Description</label>
                            <textarea name='meta_descrip'  onChange={handleInput} value={categoryInput.meta_descrip} className='form-control'></textarea>
                            <span className='text-danger'>{categoryInput.error_list.meta_descrip}</span>
                        </div>
                    </div>
                </div>
                <button type='submit' className='btn btn-primary mt-3 px-4 float-end'>Add</button>
            </form>
        </div>
    )
}

export default Category