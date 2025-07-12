import React, { useContext, useEffect, useState } from 'react'
import axios from '/src/axiosInstance'
import { LoaderContext, ModalContext, UserContext } from '../context';
import DataTable from 'react-data-table-component';
import { Trash } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';






const customStyles = {
    table: {
        style: {
          // width: '100%',           // Full width
          border: '1px solid #ccc' // Border around the table
        },
      },
	rows: {
		style: {
			// minHeight: '72px',
            // border:'1px solid gray' // override the row height
		},
	},
    
	headCells: {
		style: {
            borderLeft: '1px solid #ccc'

		},
	},
	cells: {
		style: {
            borderLeft: '1px solid #ccc'
		},
	},
};

const DatatableCompo = () => {
const [patientData,setPatientData]=useState([]);
const {userData,setUserData}=useContext(UserContext);

const {open,setOpen}=useContext(ModalContext);
const [search,setSearch]=useState();
const [filteredData,setFilteredData]=useState([]);
console.log("fd",filteredData)
const deleteData=async(id)=>{
    try {
        console.log(id)
        const deleteRow=await axios.delete(`/data/delete/${id}`);
        fetchData();
        // console.log(deleteRow)
        toast.success(deleteRow.data.message);
       
    } catch (error) {
        toast.error("something went wrong")
        console.log(error)
    }
}
const fetchData=async()=>{
   
try {
    const data=await axios.post('/data/get',{userId:userData._id});

    console.log(userData._id)
    setFilteredData(data.data);
    setPatientData(data.data);
} catch (err) {
    console.log(err)
}
}

// console.log(patientData.length)

useEffect(() => {
  const storedUser = JSON.parse(localStorage.getItem("user")); // Or "techUser"
  setUserData(storedUser);
}, []); // ✅ Step 2





useEffect(()=>{
    fetchData()
   
},[userData,open]);

useEffect(()=>{
const result= patientData.filter((data)=>{
  return data.name.toLowerCase().match(search.toLowerCase());
})
setFilteredData(result);
},[search,userData])

const columnsData=[
    {
        name: 'S.No.',
        selector: (row, index) => index + 1,
       
      },
      {
        name: 'Name',
        selector: row =><Link to={`/${row._id}`} className='text-blue-500'>{row.name} </Link>,
        sortable: true,
      },
      {
        name: 'Gender',
        selector: row => row.gender,
        sortable: true,
      },
      {
        name: 'Age',
        selector: row => row.age,
        sortable: true,
      },
      {
        name: 'Doctor Name',
        selector: row => row.doctor,
        sortable: true,
      },
      
      {
        name: 'Action',
        selector: row => <button className=' text-red-500  text-md p-2 bg-gray-100 rounded-full' onClick={()=>deleteData(row._id)}><Trash size={20}/></button>,
      },
];
console.log("dt",userData)
  return (
    <>
     <div className="add-header w-full flex justify-between md:flex-row flex-col-reverse my-4 items-center ">
     <input type='text' placeholder='Search Patients By Name' className='md:w-[50%] border border-gray-400 px-2 h-[7vh] text-md outline-none my-4 rounded-md w-full ' value={search} onChange={(e)=>setSearch(e.target.value)} />


        <button className='bg-blue-500 text-white py-0 rounded-md px-8 font-bold inline-block h-[7vh] w-1/2   md:w-auto' onClick={()=>setOpen(true)}>Add Data</button>
      </div>
   <DataTable
    className='w-full md:w-[80vw]'
   columns={columnsData} 
   data={filteredData}
   pagination
  //  fixedHeader
   highlightOnHover
   customStyles={customStyles}
  //  subHeader
  //  subHeaderComponent={<input type='text' placeholder='Search Patients By Name' className='w-[50%] border border-gray-500 px-2 py-2 text-md outline-none my-4' />}
  //  subHeaderAlign='left'
  
   />

</>
  )
}

export default DatatableCompo