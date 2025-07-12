import React, { useState } from 'react'
import Front from './component/front';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import Navbar from './component/Navbar';
import Signup from './component/signup';
import Signin from './component/signin';
import { Toaster } from 'react-hot-toast';
import { EditableContext, FormContext, LoaderContext, ModalContext, UserContext } from './context';
import ProtectedRoute from './component/protectedRoute';
import Patientpage from './component/Patientpage';
const App = () => {
  const [open, setOpen] = useState(false);
  const [userData,setUserData]=useState({})
  const [formData,setFormData]=useState({
    name: '',
    gender: '',
    age: '',
    doctor: '',
    test: '',
    opd: '',
    lab: '',
    remark: '',
    amount: '',
    date: ''
  })
  const [editable,setEditable]=useState(false);
  const [loading,setLoading]=useState(false);
const {id}=useParams();
  return (

    <div>
      <LoaderContext.Provider value={{loading,setLoading}}>
      <UserContext.Provider value={{userData,setUserData}}>
      <EditableContext.Provider value={{editable,setEditable}}>
      <FormContext.Provider value={{formData,setFormData}}>
      <ModalContext.Provider value={{ open, setOpen }}>


        <BrowserRouter>
          <Toaster position="top-right" />
          {userData?.name && <Navbar />}
          
          <Routes>
            <Route path='/signup' element={<Signup />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='/' element={
              <ProtectedRoute>
                <Front />
              </ProtectedRoute>
              } />
             <Route path='/:id' element={
              <ProtectedRoute>
                <Patientpage />
              </ProtectedRoute>
              } />
          </Routes>
        </BrowserRouter>

        {/*  */}
      </ModalContext.Provider>
      </FormContext.Provider>
      </EditableContext.Provider>
      </UserContext.Provider>
      </LoaderContext.Provider>
    </div>
  );
}



export default App


























