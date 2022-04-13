import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import MasterLayout from './layouts/admin/MasterLayout';
import PageNotFound from './assets/frontend/404';
import { FadeLoader } from 'react-spinners'

function AdminPrivateRoute({...rest}) {

    const navigate = useNavigate();

    const [Auhtenticated, setAuhtenticated] = useState(false);
    const [loading, setloading] = useState(true)

    useEffect(() => {

        axios.get('api/checkingAuthenticated').then(res=>{
            if(res.status === 200){
                setAuhtenticated(true)
            }
                setloading(false)
        })
        return () => {
            setAuhtenticated(false)
        };
    }, [])

    axios.interceptors.response.use(undefined,function axiosRetryInterceptor(err){
        if(err.response.status === 401){
            swal("Unauthorized",err.response.data.message,"warning")
            navigate('/')
        }
        return Promise.reject(err)
    })

    axios.interceptors.response.use(function(response){
        return response;
    }, function(error){
        if(error.response.status === 403){
            swal("Forbedden",error.response.data.message,"warning");
            navigate('/PageNotFound');
        } else  if(error.response.status === 404){
            swal("404 Error","Page Not Found","warning");
            navigate('/PageNotFound');
        }
        return Promise.reject(error);
    });

    if(loading){
        return <div className='myStyle'>
        <FadeLoader className='myStyleLoad'/>
        </div>
    }
  return (
    Auhtenticated ? <MasterLayout/> : <Navigate to="/" replace={true}/>
  )
}

export default AdminPrivateRoute