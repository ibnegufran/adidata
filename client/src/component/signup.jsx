import React, { useContext } from 'react'
import { Link, data, useNavigate } from 'react-router-dom'
// import {toast} from "react-hot-toast";
import { toast } from 'react-hot-toast';
import axios from '/src/axiosInstance.js'
import Loader from './Loader';
import { LoaderContext } from '../context';
const Signup = () => {
    const {loading,setLoading}=useContext(LoaderContext);

    const navigate = useNavigate();
    const submitHandler = async (e) => {

        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.target);
        const obj = Object.fromEntries(formData.entries());
        const { name, email, password } = obj;
        console.log(name, email, password);
        try {
            const { data } = await axios.post('/user/signup', obj);
            console.log(data.success)
            if (data.success) {
                toast.success(data.message);
                navigate('/signin')
            }

        } catch (err) {


            if (err.response && err.response.data) {
                toast.error(err.response.data.message);
            } else {
                toast.error("Something went wrong");

            }

        }  finally{
            setLoading(false);  
          }
    }
    return (
        <div>
            {loading ? (<Loader />) : (
                 <div className="signup min-h-[90vh] flex justify-center items-center" >
                 <div className="md:w-[40vw] shadow-lg w-[90vw] py-12 rounded-md px-4 flex flex-col gap-4 items-center border border-gray-100">
                     <h1 className='text-[2rem] font-bold'>Signup</h1>
                     <form action="" className='w-full flex flex-col gap-6' onSubmit={submitHandler}>
 
                         <input className='w-full border shadow-sm border-gray-100 outline-none p-2 focus:outline-blue-500 rounded-sm' placeholder='please enter your name' type="text" name="name" />
                         <input className='w-full border shadow-sm border-gray-100 outline-none p-2 focus:outline-blue-500 rounded-sm' placeholder='please enter your email' type="email" name="email" />
                         <input className='w-full border shadow-sm border-gray-100 outline-none p-2 focus:outline-blue-500 rounded-sm' placeholder='please enter your password' type="password" name="password" />
                         <input className='rounded-md cursor-pointer  shadow-sm border-gray-200 text-center bg-blue-500 text-white py-2' type="submit" value="Signup" />
                     </form>
                     <p>Already have an account / <Link to={'/signin'} className='text-blue-500'>signin</Link></p>
                 </div>
             </div>
            )}
           
        </div>
    )
}

export default Signup