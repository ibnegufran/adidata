import React, { useContext, useEffect, useState } from 'react'
import { ModalContext, UserContext } from '../context';
import { Form } from 'react-router-dom';
import ModalComponent from './Form';
import DatatableCompo from './Datatable';
const Front = () => {
  const {open,setOpen}=useContext(ModalContext);
  const openModal = () => {
    setOpen(true);
  }
const {userData,setUserData}=useContext(UserContext);

useEffect(() => {
  const storedUser = JSON.parse(localStorage.getItem("user")); // Or "techUser"
  setUserData(storedUser);
}, []); 
  console.log("after signin user data",userData)

  return (
    <div className='min-h-[90vh] flex items-center justify-start flex-col md:w-[80vw]  mx-auto px-4 md:px-0'>
     
      {/* modal */}
   
      <ModalComponent />





      <div className="data w-full mt-8">
        <DatatableCompo />
      </div>


    </div>
  )
}

export default Front