import { faBookBookmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';
import Navbar from '../../../layouts/frontend/Navbar';

function HomeCategory() {
    const [category, setCategory] = useState([]);
    useEffect(() => {
        axios.get(`/api/get-category`).then(res => {
            if (res.data.status === 200) {
                setCategory(res.data.category)
            }
        });
    }, []);

        var showCategory = '';
        showCategory = category.map((item) => {
            return (
                <div className='col-md-3' key={item.id}>
                    <div className='p-4 shadow border categoryBg text-center'>
                        <div className='p-4 text-center'>
                            <Link className=' textStyle categoryText' to={`./${item.slug}`}>{item.name}</Link>
                        </div>
                    </div>
                </div>
            )
        });
    return (
        <>
        <div>
        <Navbar/>
        </div>
        <div className='bodyContainer'>   
            <img className='Loginimg' src={process.env.PUBLIC_URL + '/loginBge.jpg'} width="100%" alt='bro' />
            <div className='categoryContainer text-center mt-5'>
                <div className='container my-3'>
                    <h3 className='textStyle display-3 fw-bold'>Books Category <FontAwesomeIcon className='fa fa-1x' icon={faBookBookmark}/></h3>
                </div>
                <div className='container bg-transparent'>
                    <div className='row'>
                        {showCategory}
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default HomeCategory