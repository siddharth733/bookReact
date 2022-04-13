import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Document,Page } from 'react-pdf/dist/esm/entry.webpack';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';
import swal from 'sweetalert';
import Navbar from '../../../layouts/frontend/Navbar'
function ReadPage() {

    const navigate = useNavigate();
    const [books, setBooks] = useState([])
    const { book } = useParams();
    const book_slug = book;
    useEffect(() => {
        if (!localStorage.getItem('auth_token')) {
            swal('Warning', 'Pleas Login First', 'warning');
            navigate('/login');
        }
        axios.get(`/api/get-bookread/${book_slug}/read`).then(res => {
            if (res.data.status === 200) {
                setBooks(res.data.books_data)
            } else if (res.data.status === 404) {
                swal('Warning', res.data.message, 'warning')
                navigate('/pageNotFound')
            }
        });
    }, [book]);
    const [numPages, setNumPage] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    function onDocumentLoadSuccess({numPages}){
        setNumPage(numPages);
        setPageNumber(1);
    }
    function changePage(offSet){
        setPageNumber(prevPageNumber => prevPageNumber + offSet)
    }
    function changePageBack(){
        changePage(-1)
    }
    function changePageNext(){
        changePage(+1)

    }
    var showBooks = '';
    showBooks = books.map((item, idx) => {
        return (
            <div key={item}>
                <div className='mt-5 ' >
                    <Document file={item.file} onLoadSuccess={onDocumentLoadSuccess} >
                        <Page pageNumber={pageNumber} height={550} />
                        <p>Page {pageNumber} of {numPages}</p>
                        {pageNumber > 1 && <button className='btn btn-secondary ms-5' onClick={changePageBack}>Previous Page</button>}
                        {pageNumber < numPages && <button className='btn btn-primary ms-5' onClick={changePageNext}>Next Page</button>}
                    </Document>
                </div>
            </div>
        )
    });
    return (
        <div className='bodyContainer'>
            <Navbar />
            <img className='Loginimg' src={process.env.PUBLIC_URL + '/loginBge.jpg'} width="100%" alt='bro' />
            <div className='categoryContainers'>
                {showBooks}
            </div>
        </div>
    )
}

export default ReadPage