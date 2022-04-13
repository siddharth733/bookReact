import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../../assets/admin/css/styles.css'
import '../../assets/admin/js/scripts'
import { faPen, faSuitcase, faUser, faUserAlt, faUserCheck, faUserCircle, faUserClock, faUserDoctor, faUserEdit, faUserFriends, faUserGraduate, faUserLarge, faUserMd, faUserNinja, faUserPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Dashboard = () => {
  const [user, setUser] = useState()
  const [author, setAuthor] = useState()
  const [admin, setAdmin] = useState()
  const [manager, setManager] = useState()
  const [loading, setloading] = useState(true)
  useEffect(() => {
    axios.get(`/api/get-dashboard`).then(res => {
        if(res.data.status===200){
            setUser(res.data.user);
            setAuthor(res.data.author);
            setAdmin(res.data.admin);
            setManager(res.data.manager);
            setloading(false)
        }
    })
}, [])
  return (
    <div className='row m-5'>
      <div className='col-lg-4'>
        <div className='card shadow'>
        <div className='card-body text-center'>
        <FontAwesomeIcon className='w-100 fa fa-3x' icon={faUserFriends}/>
        <h3 className='mt-3'>User</h3>
        <h5>{user}</h5>
        </div>
        </div>
      </div>
      <div className='col-lg-4'>
        <div className='card shadow'>
        <div className='card-body text-center'>
        <FontAwesomeIcon className='w-100 fa fa-3x' icon={faUserPen}/>
        <h3 className='mt-3'>Author</h3>
        <h5>{author}</h5>
        </div>
        </div>
      </div>
      <div className='col-lg-4'>
        <div className='card shadow'>
        <div className='card-body text-center'>
        <FontAwesomeIcon className='w-100 fa fa-3x' icon={faSuitcase}/>
        <h3 className='mt-3'>Manager</h3>
        <h5>{manager}</h5>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard