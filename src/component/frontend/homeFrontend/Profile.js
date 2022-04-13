import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Navbar from '../../../layouts/frontend/Navbar'

function Profile() {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        axios.get(`/api/get-profile`).then(res => {
            if (res.data.status === 200) {
                setUsers(res.data.profile)
            }
        });
    }, []);

    var profile_data = '';
    profile_data = users.map((item) => {
        return(
            <div className='row loginRaw justify-content-center h-100' key={item.id}>
            <img src={process.env.PUBLIC_URL + 'loginBge.jpg'} className='mt-5 mb-2 w-75 rounded-circle Loginimg' />
            <div className='text-center mt-5 pt-5 categoryContainer'>
            <label className='fw-bold'>Name</label>
            <h3 className='mb-3 textStyle'>{item.name}</h3>
            <label className='fw-bold'>Email</label>
            <h3 className='mb-3 textStyle'>{item.email}</h3>
            </div>
        </div>
        )
    });
  return (
    <div className='bodyContainer'>
            <Navbar />
            <img className='Loginimg' src={process.env.PUBLIC_URL + '/loginBge.jpg'} width="100%" alt='bro' />
            <div className='categoryContainers'>
                {profile_data}
            </div>
        </div>
  )
}

export default Profile