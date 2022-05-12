import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';
import swal from 'sweetalert';
import PageNotFound from '../../../assets/frontend/404';
import Navbar from '../../../layouts/frontend/Navbar';

function ViewBooks() {
    const navigate = useNavigate();
    const [books, setBooks] = useState([])
    const [category, setCategory] = useState([])
    const {slug} = useParams();
    const book_slug = slug;
    useEffect(() => {
        axios.get(`/api/get-books/${book_slug}`).then(res=>{
            if(res.data.status === 200){
                setBooks(res.data.books_data.books)
                setCategory(res.data.books_data.category)
            }else if(res.data.status === 404){
                swal('Warning',res.data.message,'warning')
                navigate('/pageNotFound')
            }
        });
    }, [slug]);


          var showBooks = '';
          showBooks = books.map( (item,idx) => {
              const handleCheack = (e) => {
                  e.preventDefault();
                  if(localStorage.getItem('auth_token')){
                      navigate(`./${item.slug}/read`)
                  }else{
                        swal('Warning','Pleas Login First','warning');
                  }
              }
              return(
                  <div className='col-md-4 my-3' key={item.id}>
                        <div className='shadow CardBG text-center h-100 border'>
                            <img src={item.image} className='mt-3' height={200} width={150} alt={item.name}/>
                            <div className='p-4 mb-4'>
                                <h4 className='textStyle'>{item.name}</h4>
                                <button className='btn text-black fw-bold btn-outline-success m-2 px-4 textStyle' onClick={handleCheack}>Read</button>
                                <Link className='btn text-black fw-bold btn-outline-primary m-2 px-4 textStyle' to={`./${item.slug}`}>Detail</Link>
                            </div>
                        </div>
                  </div>
              )
          });
    return (
        <>
        <div>
        <Navbar/>
        <div className='bodyContainer'>
        <img className='Loginimg' src={process.env.PUBLIC_URL + '/loginBge.jpg'} width="100%" alt='bro' />
        <div className='categoryContainered mt-5'>
            <div className='py-3'>
                <div className='container'>
                    <div className='row'>
                    {showBooks}
                    </div>
                </div>
            </div>
        </div>
        </div>
        </div>
        </>
    )
}

export default ViewBooks