import React from 'react'
import { Link } from 'react-router-dom'
import '../../Css/styles.css'

const PageNotFound = () => {
    const myStyle ={
        position:'absolute',
        width:'100%',
        height:'100%',
        paddingTop:'40vh',
        backgroundColor:'red',
     }
     const textStyle ={
       color:'red',
       fontSize:'75px',
       fontFamily:'Segoe Print'
     }
  return (
    <>
       <div className='text-center' style={myStyle}>
       <h1 className='titleErrors'>404 Page Not Found</h1>
       <Link className='btn btn-dark mt-3 px-5' to="/">Home</Link>
       </div>   
    </>
  )
}

export default PageNotFound