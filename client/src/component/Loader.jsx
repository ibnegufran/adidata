import React, { useContext } from 'react'
import { ClipLoader } from 'react-spinners'
import { LoaderContext } from '../context';

const Loader = () => {
const {loading,setLoading}=useContext(LoaderContext);

const style={
    margin:"0 auto",
    display:"block",
    
    
  }
  
  return (
    <div><div className="h-[90vh] flex justify-center items-center bg-gray-200 opacity-5">
    <ClipLoader
    color="#3B82F6"
    loading={loading}
    size={150}
    cssOverride={style}
    className='block mx-auto text-24'
    aria-label="Loading Spinner"
    data-testid="loader"
  />
  </div>
  </div>
  )
}

export default Loader