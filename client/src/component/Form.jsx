import React, { useContext, useState } from 'react'
import { EditableContext, FormContext, LoaderContext, ModalContext } from '../context';
import Modal from 'react-modal';
import { X } from 'lucide-react';
import axios from '/src/axiosInstance';
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom';
const ModalComponent = () => {
  const { open, setOpen } = useContext(ModalContext);
  const { editable, setEditable } = useContext(EditableContext);
  const { id } = useParams();
  // console.log(id)
  const { formData, setFormData } = useContext(FormContext);
  const {loading,setLoading}=useContext(LoaderContext);

  // const [entries,setEntries]=useState([]);
  // console.log(formData)
  const user = localStorage.getItem('user');
  JSON.parse(user)
  const userObject = JSON.parse(user);
  // console.log(userObject)
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true)
    // const formData=new FormData(e.target);


    // const obj=Object.fromEntries(formData);
    // console.log(obj)
    const finalData = {
      ...formData,
      userId: userObject._id,
    }
    // console.log(finalData);
    try {
      const data = await axios.post('/data/add', finalData);
      toast.success("New Data Added Successfully");
      // console.log(data);
      setOpen(false);

    } catch (error) {
      toast.error("Error in adding data");
      console.log(error)
    }finally{
      setLoading(false)
    }

  }


  const updateHandler = async (e) => {
    try {
      e.preventDefault();
      // console.log(formData)
      // console.log("editing")
      const updatedData = await axios.put(`/data/update/${id}`, formData);
      toast.success(updatedData.data.message);
      setOpen(false);
    } catch (error) {
      toast.error("something went wrong")
      console.log(error);
    }
  }


  return (
    <div>
      <Modal
        isOpen={open}
        // className={"w-[50vw] h-[80vh] mx-auto border-0 outline-none bg-yellow-200"}
        style={customStyles}
      >
        <div className="w-[80vw]  h-[80vh]">
          <div className="header flex justify-between ">
            <h1 className='text-[1.8rem] font-bold text-blue-500'>{editable ? "Edit" : "Add New"} Patient Data</h1>
            <X
              size={30}
              onClick={() => setOpen(false)}
              className="cursor-pointer"
            />
          </div>
          <form action="" className='form' onSubmit={editable ? updateHandler : submitHandler}>
            <div className="" >
              <input value={formData.name} onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} className='border w-full border-gray-100 shadow-sm p-2 text-[]' type="text" name="name" id="" placeholder='Enter Patient Name' />
            </div>
            <div className="">
              <p>Gender : </p>
              <input checked={formData.gender === "Male"} onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} className='mx-1' value='Male' type="radio" name="gender" id="Male" />
              <label htmlFor="Male" className='mr-4'>
                Male
              </label>


              <input checked={formData.gender === "Female"} onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} className='mx-1' value='Female' type="radio" name="gender" id="Female" />
              <label htmlFor="Female">
                Female
              </label>

            </div>

            <div className="">
              <input value={formData.age} onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} className='border w-full border-gray-100 shadow-sm p-2 text-[]' type="number" name="age" id="" placeholder='Enter Patient Age' />
            </div>

            <div className="">
              <input value={formData.doctor} onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} className='border w-full border-gray-100 shadow-sm p-2 text-[]' type="text" name="doctor" id="" placeholder='Enter Patient Doctor Name' />
            </div>

            <div className="">
              <input value={formData.test} onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} className='border w-full border-gray-100 shadow-sm p-2 text-[]' type="text" name="test" id="" placeholder='Enter Patient Test' />
            </div>

            <div className="">
              <input value={formData.opd} onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} className='border w-full border-gray-100 shadow-sm p-2 text-[]' type="text" name="opd" id="" placeholder='Enter OPD/IPD' />
            </div>

            <div className="">
              <input value={formData.lab} onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} className='border w-full border-gray-100 shadow-sm p-2 text-[]' type="text" name="lab" id="" placeholder='Enter Lab Name' />
            </div>

            <div className="">
              <input value={formData.remark} onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} className='border w-full border-gray-100 shadow-sm p-2 text-[]' type="text" name="remark" id="" placeholder='Enter Remark ' />
            </div>

            <div className="">
              <input value={formData.amount} onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} className='border w-full border-gray-100 shadow-sm p-2 text-[]' type="number" name="amount" id="" placeholder='Enter Amount' />
            </div>

            <div className="">
              <input value={formData.date} onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} className='border w-full border-gray-100 shadow-sm p-2 text-[]' type="date" name="date" id="" placeholder='Enter Date' />
            </div>
            <div className="flex items-start justify-start ">
              <input type="submit" className='w-[40vw] md:w-[15vw] bg-blue-500 text-white text-xl py-2 rounded-sm cursor-pointer' value={editable ? "Edit" : "Add"} />
            </div>


          </form>
        </div>

      </Modal>
    </div>
  )
}

export default ModalComponent