import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast';
import axios from '/src/axiosInstance.js'

const Signin = () => {
    const navigate=useNavigate();

    const submitHandler=async(e)=>{
e.preventDefault();
const formData=new FormData(e.target);
const obj=Object.fromEntries(formData.entries());
const {email,password}=obj;
console.log(email,password);
try {
const {data}=await axios.post('/user/signin',obj);
console.log(data)
    
        toast.success("Signin Successfully");
       localStorage.setItem('token',data.token);
       localStorage.setItem('user',JSON.stringify(data.isEmail))
        navigate('/')
    
    
} catch(err) {
if (err.response && err.response.data) {
    console.log(err.response.data.message)
        toast.error(err.response.data.message);
      } else{
        toast.error("Something went wrong");

      }
    
}
    }
  return (
    <div>
        <div className="signup min-h-[90vh] flex justify-center items-center" >
            <div className="md:w-[40vw] py-12 rounded-md px-8 flex flex-col gap-4 items-center border border-gray-100">
                <h1 className='text-[2rem] font-bold'>Signin</h1>
            <form action="" className='w-full flex flex-col gap-6' onSubmit={submitHandler}>

               
                <input className='w-full border shadow-sm border-gray-100 outline-none p-2 focus:outline-blue-500 rounded-sm' placeholder='please enter your email' type="email" name="email" id="" />
                <input className='w-full border shadow-sm border-gray-100 outline-none p-2 focus:outline-blue-500 rounded-sm' placeholder='please enter your password' type="password" name="password" id="" />
                <input className='rounded-md cursor-pointer  shadow-sm border-gray-200 text-center bg-blue-500 text-white py-2' type="submit" value="Signin" />
            </form>
            <p>Don't have an account / <Link to={'/signup'} className='text-blue-500'>signup</Link></p>
            </div>
        </div>
    </div>
  )
}

export default Signin