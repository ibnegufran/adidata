import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from '/src/axiosInstance'
import { Pencil } from 'lucide-react';
import { EditableContext, FormContext, LoaderContext, ModalContext } from '../context';
import ModalComponent from './Form';
import Loader from './Loader';
const Patientpage = () => {
    const {id}=useParams();
const {open,setOpen}=useContext(ModalContext);
const {editable,setEditable}=useContext(EditableContext);
const {formData,setFormData}=useContext(FormContext);

const {loading,setLoading}=useContext(LoaderContext);


    const [singlePatientData,setSinglePatientData]=useState([]);

    const updateHandle=()=>{
       
            setEditable(true);
setFormData({
    name:singlePatientData.name,
    age:singlePatientData.age,
    doctor:singlePatientData.doctor,

    gender:singlePatientData.gender,
    lab:singlePatientData.lab,
    opd:singlePatientData.opd,
    test:singlePatientData.test,
    remark:singlePatientData.remark,
    amount:singlePatientData.amount,
    date:singlePatientData.date?.slice(0,10),

})
            console.log("click");
            setOpen(true);
           
        
    }

    const getDataById=async()=>{
        setLoading(true);
        try {
            const {data}=await axios.get(`/data/getById/${id}`)
            setSinglePatientData(data);
            console.log(data)
        } catch (error) {
            console.log(error)
        } finally{
            setLoading(false);
        }
        
    }
    
    useEffect(()=>{
        getDataById();
    },[open])
  return (
    <div>
        {loading ? (<Loader />) : (

<div className="container md:w-[65vw] mx-auto py-8 bg-gray-50 px-6 my-4">
    <div className="header flex flex-col md:flex-row md:items-center md:gap-8 w-full justify-between my-4">
        <div className="flex items-center gap-8">
    {/* <p className='text-[5rem]'>{singlePatientData.gender === 'Male' ? '👨' : singlePatientData.gender === 'Female' ? '👩' : '👤'}</p> */}
    {singlePatientData.gender === 'Male'? <img src='/images/man2.png' className='h-[20vh]'/> : <img src='../images/female.png' className='h-[20vh]'/>}
    <div className="data">
     <p className='text-2xl font-bold text-blue-500'>{singlePatientData.name}</p>
     <p className='text-lg  text-blue-500'>{singlePatientData.gender}</p>
     <p className='text-lg  text-blue-500'>{singlePatientData.age}</p>
    </div>
    </div>
     <button onClick={updateHandle} className='text-white bg-blue-500 px-2 md:px-0 py-2 w-[30vw] md:w-[10vw] justify-center rounded-md justify-self-start flex items-center gap-2'><span>Edit Data</span> <Pencil size={20}/></button>
    </div>

<div className="boxes">
    <div className="box bg-blue-50 p-4 text-blue-500">
        <h4 className='text-xl font-bold '>Date :</h4>
        <p className='text-lg'>{new Date(singlePatientData.date).toLocaleDateString('en-IN')}</p>
    </div>
    <div className="box bg-blue-50 p-4 text-blue-500">
        <h4 className='text-xl font-bold '>Tests :</h4>
        <p className='text-lg'>{singlePatientData.test}</p>
    </div>
    <div className="box bg-blue-50 p-4 text-blue-500">
        <h4 className='text-xl font-bold '>OPD/IPD :</h4>
        <p className='text-lg'>{singlePatientData.opd}</p>
       
    </div>
    <div className="box bg-blue-50 p-4 text-blue-500">
        <h4 className='text-xl font-bold '>Lab :</h4>
        <p className='text-lg'>{singlePatientData.lab}</p>
    </div>
    <div className="box bg-blue-50 p-4 text-blue-500">
        <h4 className='text-xl font-bold '>Reamark :</h4>
        <p className='text-lg'>{singlePatientData.remark}</p>
    </div>
    <div className="box bg-blue-50 p-4 text-blue-500">
        <h4 className='text-xl font-bold '>Amount :</h4>
        <p className='text-lg'>₹{singlePatientData.amount}</p>
    </div>
    
    
</div>
</div>
        )}

    

<ModalComponent />
    </div>
  )
}

export default Patientpage