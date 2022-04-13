import React from 'react'
import '../../assets/admin/css/styles.css'
import '../../assets/admin/js/scripts'

const Profile = () => {
  return (
    <div>
    <div className='card m-5 bg-success shadow'>
    <div className='card-body'>
        <table class="table table-light table-bordered table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>BirtDate</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td scope="row">Parth</td>
              <td>2009</td>
              <td>13</td>
            </tr>
            <tr>
              <td scope="row">Sid</td>
              <td>2001</td>
              <td>21</td>
            </tr>
          </tbody>
        </table>
    </div>
    </div>
    </div>
  )
}

export default Profile