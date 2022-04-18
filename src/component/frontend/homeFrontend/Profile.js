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
            <div className='row loginRaw justify-content-center h-75 w-100' key={item.id}>
            <img src={process.env.PUBLIC_URL + 'loginBge.jpg'} className='rounded-circle Loginimge' />
            <div className='text-center categoryContainerss'>
                <label className='fw-bold'>Name</label>
                <h3 className='textStyles'>{item.name}</h3>
                <label className='fw-bold'>Email</label>
                <h3 className='textStyles'>{item.email}</h3>
            </div>
        </div>
        )
    });
  return (
    <>
    <Navbar />
    <div className='bodyContainer'>
            <img className='Loginimg' src={process.env.PUBLIC_URL + '/loginBge.jpg'} width="100%" alt='bro' />
            <div className='categoryContainers w-100'>
                {profile_data}
            </div>
        </div>
    </>
  )
}

export default Profile