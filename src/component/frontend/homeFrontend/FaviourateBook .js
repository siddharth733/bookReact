import axios from 'axios'
import React, { useState,useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import Navbar from '../../../layouts/frontend/Navbar';


function FaviourateBook () {
    const navigate = useNavigate();
    const [books, setBooks] = useState([])
    const [dataInput, setData] = useState({
        user_id: localStorage.getItem('auth_id'),
    });
    const handleInput = (e) => {
        e.persist();
        setData({ ...dataInput, [e.target.name]: e.target.value })
    }
    const book = localStorage.getItem('user_id');
    const data = {
        user_id: dataInput.user_id,
      }
    useEffect(() => {
        axios.get(`/api/get-faviourate`,data).then(res=>{
            if(res.data.status === 200){
                setBooks(res.data.fav_books);
            }
        })
    }, [])

    var result = '';
    result = books.map((item) => {
        const handleCheack = (e) => {
            e.preventDefault();
            if(localStorage.getItem('auth_token')){
                navigate(`../category/${item.category.slug}/${item.slug}/read`)
            }else{
                  swal('Warning','Pleas Login First','warning');
            }
        }
        return(
            <div className='col-md-4 my-3' key={item.id}>
                        <div className='shadow CardBG m-2 text-center h-100 border'>
                            <img src={item.image} className='mt-3' height={200} width={150}  alt={item.name}/>
                            <div className='p-4'>
                                <h4 className='textStyle'>{item.name}</h4>
                                <button className='btn text-black fw-bold btn-outline-success m-2 px-4 textStyle' onClick={handleCheack}>Read</button>
                                <Link className='btn text-black fw-bold btn-outline-primary m-2 px-4 textStyle' to={`./${item.slug}`}>Detail</Link>
                            </div>
                        </div>
                  </div>
        )
    })
  return (
    <div>
    <Navbar/>
    <div className='bodyContainer'>
    <img className='Loginimg' src={process.env.PUBLIC_URL + '/loginBge.jpg'} width="100%" alt='bro' />
    <div className='categoryContainered mt-5'>
        <div className='py-3'>
            <div className='container'>
                <div className='row'>
                {result}
                </div>
            </div>
        </div>
    </div>
    </div>
    </div>
  )
}

export default FaviourateBook 