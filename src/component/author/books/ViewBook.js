import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FadeLoader } from 'react-spinners'
import swal from 'sweetalert'

function ViewBook() {
  const [viewBooks, setBooks] = useState([])
  const [loading, setLoading] = useState(true)


  const deleteBook = (e, id) =>{
    e.preventDefault();
    const thisClicked = e.currentTarget;
    thisClicked.innerText = 'Deleting';
    axios.delete(`/api/delete-book/${id}`).then(res => {
        if(res.data.status === 200){
            swal('Success',res.data.message,'success');
            thisClicked.closest('tr').remove();
        }else if(res.data.status === 404){
            swal('Error',res.data.message,'error');
            thisClicked.innerText = 'Delete';
        }
    });
}

  useEffect(() => {
    axios.get(`/api/view-books`).then(res => {
      if(res.data.status === 200){
        setBooks(res.data.booksData);
        setLoading(false);
      }
    });
  }, [])
  var view_BookData = "";
  if(loading){
    return <div className='myStyle'>
    <FadeLoader className='myStyleLoad'/>
    </div>
  }else{
    view_BookData = viewBooks.map((item) => {
      return(
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.category.name}</td>
          <td>{item.name}</td>
          <td><img src={item.image} width='80px'/></td>
          <td><Link to={`/author/edit-books/${item.id}`} className='btn btn-secondary btn-sm'>Edit</Link></td>
          <td><button type='button' onClick={ (e) => deleteBook(e,item.id)} className='btn btn-danger btn-sm'>Delete</button></td>
        </tr>
      )
    });
  }
  return (
    <div className='categoryContainereds pd-4'>
      <div className='card mt-4'>
        <div className='card-header'>
        <h4>View Books
        <Link to="/author/add-books" className='viewAdd'>Add Books</Link></h4>
        </div>
        <div className='card-body'>
          <div className='table-responsive'>
            <table className='table table-bordered text-center table-striped'>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Category Name</th>
                  <th>Book Name</th>
                  <th>Image</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
              {view_BookData}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewBook