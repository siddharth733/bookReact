import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FadeLoader } from 'react-spinners'

function ViewWork() {
    const [loading, setloading] = useState(true)
    const [worklsit, setWorklist] = useState([])
    useEffect(() => {
        axios.get(`/api/get-authorwork`).then(res => {
            if(res.data.status===200){
                setWorklist(res.data.booksData);
                setloading(false)
            }
        })
    }, [])

    var viewCategory_HTML_TABLE = '';
    if(loading){
        return <div className='myStyle'>
        <FadeLoader className='myStyleLoad'/>
        </div>
    }else{
        viewCategory_HTML_TABLE = worklsit.map((item) => {
            return(
                <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.user.name}</td>
                <td>{item.name}</td>
                <td><img src={item.image} width="60px"/></td>
                </tr>
            )
        });
    }
  return (
    <div className='categoryContainereds pd-4'>
        <div className='card'>
            <div className='card-header'>
                <h3 className='viewAddHead'>Authors Work List</h3>
            </div>
            <div className='card-body'>
            
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Author</th>
                        <th>Name</th>
                        <th>Image</th>
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

export default ViewWork