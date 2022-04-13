import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FadeLoader } from 'react-spinners';
import swal from 'sweetalert';

function ViewSalesmanager() {
    const [loading, setloading] = useState(true)
    const [userlist, setUserlist] = useState([])

    useEffect(() => {
        axios.get(`/api/view-salemanager`).then(res => {
            if(res.status === 200){
                setUserlist(res.data.category)
            }
            setloading(false)
        });
    }, []);

    const deleteManager = (e, id) =>{
        e.preventDefault();
        const thisClicked = e.currentTarget;
        thisClicked.innerText = 'Deleting';
        axios.delete(`/api/delete-salemanager/${id}`).then(res => {
            if(res.data.status === 200){
                swal('Success',res.data.message,'success');
                thisClicked.closest('tr').remove();
            }else if(res.data.status === 404){
                swal('Error',res.data.message,'error');
                thisClicked.innerText = 'Delete';
            }
        });
    }

    var viewCategory_HTML_TABLE = '';
    if(loading){
        return <div className='myStyle'>
        <FadeLoader className='myStyleLoad'/>
        </div>
    }else{
        viewCategory_HTML_TABLE = userlist.map((item) => {
            return(
                <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td><Link to={`/admin/edit-salemanager/${item.id}`} className='btn btn-secondary btn-sm'>Edit</Link></td>
                <td><button type='button' onClick={ (e) => deleteManager(e,item.id)} className='btn btn-danger btn-sm'>Delete</button></td>
                </tr>
            )
        });
    }
  return (
    <div className='container mt-5 p-5'>
        <div className='card'>
            <div className='card-header'>
                <h3 className='viewAddHead'>Category List <Link className='viewAdd' to='/admin/add-salemanager'>Add Salemanager</Link></h3>
            </div>
            <div className='card-body'>
            
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                {viewCategory_HTML_TABLE}
                </tbody>
            </table>
            
            </div>
        </div>
    </div>
  )
}

export default ViewSalesmanager