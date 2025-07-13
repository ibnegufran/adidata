import axios from 'axios';
import {  User } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate} from 'react-router-dom';
import { UserContext } from '../context';

const Navbar = () => {
  const {userData,setUserData}=useContext(UserContext);

  const navigate=useNavigate();
  const [show,setShow]=useState(false);
  const user=JSON.parse(localStorage.getItem('user'));


  function getUser(){

  
  }

  const logoutHandler=()=>{
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUserData({});
    navigate('/signin')
  }

// useEffect(()=>{
// //  getUser()
// const user=localStorage.getItem('user');

// setUserData(JSON.parse(user));
// },[userData])
  
  return (
    <div className='relative h-[10vh] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]    flex items-center px-3 md:px-0 justify-center py-2'>
     {show && (
      <div className="absolute top-[99%] right-40 bg-gray-50 shadow-md  text-center space-y-4 p-4 rounded-md">
<p className="name">{user?.name}</p>
<p className="name">{user?.email}</p>

      </div>
     )}
      <nav className='w-screen md:w-[80vw]   flex items-center px-0 md:px-0 justify-between '>
       <Link to={'/'}> <h1 className=' text-[1.5rem] md:text-[2rem] font-bold text-blue-500 flex'>Adidata</h1></Link>
       <div className="text-center items-center gap-2 md:gap-4 flex">
      {user?.name && (
 <p className='flex gap-2 cursor-pointer' onClick={()=>setShow(!show)}><span><User size={20}/> </span> <span>{user?.name}</span> </p>

      )} 

        <button className='btn-danger bg-red-500 text-white font-bold px-4 py-1 rounded-md md:text-lg' onClick={logoutHandler} >Logout</button>
        </div>
      </nav>
    </div>
  )
}

export default Navbar