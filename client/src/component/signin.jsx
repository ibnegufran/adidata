import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast';
import axios from '/src/axiosInstance' // Make sure this imports your custom instance
import { LoaderContext, UserContext } from '../context';
import Loader from './Loader';

const Signin = () => {
    const navigate = useNavigate();
    const { userData,setUserData } = useContext(UserContext);
    const { loading,setLoading } = useContext(LoaderContext);

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.target);
        const obj = Object.fromEntries(formData.entries());

        try {
            const { data } = await axios.post('/user/signin', obj); // This uses your configured instance

            toast.success("Signed in successfully!");
            
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.isEmail));
            
            // IMPORTANT: The axios.defaults.headers.common line is now less critical here
            // because the interceptor in axiosInstance.js will handle it for all requests
            // made through that instance. You can remove this line if you prefer to rely
            // entirely on the interceptor for header setting.
            // axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`; 
            
            setUserData(data.isEmail); // Update context
            navigate('/'); // Navigate to the home page
        } catch (err) {
            if (err.response && err.response.data) {
                console.log(err.response.data.message);
                toast.error(err.response.data.message);
            } else {
                toast.error("Something went wrong");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {loading ? (
                <Loader />
            ) : (
                <div className="signup min-h-[90vh] flex justify-center items-center" >
                    <div className="md:w-[40vw] shadow-lg w-[90vw] py-12 rounded-md px-8 flex flex-col gap-4 items-center border border-gray-100">
                        <h1 className='text-[2rem] font-bold'>Signin</h1>
                        <form action="" className='w-full flex flex-col gap-6' onSubmit={submitHandler}>
                            <input className='w-full border shadow-sm border-gray-100 outline-none p-2 focus:outline-blue-500 rounded-sm' placeholder='Please enter your email' type="email" name="email" id="" required />
                            <input className='w-full border shadow-sm border-gray-100 outline-none p-2 focus:outline-blue-500 rounded-sm' placeholder='Please enter your password' type="password" name="password" id="" required />
                            <input className='rounded-md cursor-pointer shadow-sm border-gray-200 text-center bg-blue-500 text-white py-2' type="submit" value="Sign In" />
                        </form>
                        <p>Don't have an account? <Link to={'/signup'} className='text-blue-500'>Sign up</Link></p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Signin;