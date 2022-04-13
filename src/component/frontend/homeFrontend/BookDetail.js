import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import Navbar from '../../../layouts/frontend/Navbar'

function BookDetail() {
    const navigate = useNavigate();
    const [books, setBooks] = useState([])
    const [favBook, setfavBook] = useState(true)
    const { book } = useParams();
    const book_slug = book;
    const [dataInput, setData] = useState({
        book_id: '5',
        user_id: localStorage.getItem('auth_id'),
    });
    const handleInput = (e) => {
        e.persist();
        setData({ ...dataInput, [e.target.name]: e.target.value })
    }
    useEffect(() => {
        axios.get(`/api/get-booksdetail/${book_slug}`).then(res => {
            if (res.data.status === 200) {
                setBooks(res.data.books_data)
            } else if (res.data.status === 404) {
                swal('Warning', res.data.message, 'warning')
                navigate('/pageNotFound')
            }
        });

        axios.get(`/api/cheack-faviourate/${book_slug}`).then(res => {
            if (res.data.status === 200) {
               setfavBook(true)
            } else if (res.data.status === 404) {
               setfavBook(false)
            }
        });

    }, [book]);

    const AddFaviourate = (e) => {
            e.preventDefault();
            const data = {
                book_id: dataInput.book_id,
                user_id: dataInput.user_id,
              }
              if(localStorage.getItem('auth_token')){
                axios.post(`/api/faviourate/${book_slug}`,data).then(res => {
                    if(res.data.status === 200){
                      swal('Success',res.data.message,'success');
                      navigate('/faviourate');
                    }else if(res.data.status === 404){
                      swal('Warning',res.data.message,'warning');
                      navigate('/faviourate');
                    }
                  });
              }else{
                  swal('Warning','Please Login First','warning');
              }
}

    var showBooks = '';
    showBooks = books.map((item, idx) => {
        return (
            <div key={item}>
                <img src={item.image} width='100%' height='400px' alt={item.name} />
                <div className='m-4'>
                    <h4 className='textStyle'><b>Name</b> : {item.name}</h4>
                    <h4 className='textStyle'><b>Category</b> : {item.category.name}</h4>
                    <h4 className='textStyle'><b>Description</b> : {item.description}</h4>
                    {favBook?<button className='btn btn-sm btn-success text-black fw-bold p-2 px-4 mt-1' onClick={AddFaviourate}>Faviourate</button>:<button className='btn btn-sm btn-danger text-black fw-bold p-2 px-4 mt-1' onClick={AddFaviourate}>UnFaviourate</button>}
                </div>
            </div>
        )
    });
    return (
        <div className='bodyContainer'>
            <Navbar />
            <img className='Loginimg' src={process.env.PUBLIC_URL + '/loginBge.jpg'} width="100%" alt='bro' />
            <div className='categoryContainers mt-4 border'>
                {showBooks}
            </div>
        </div>
    )
}

export default BookDetail