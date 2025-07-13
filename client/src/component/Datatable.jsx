import React, { useContext, useEffect, useState } from 'react';
import axios from '/src/axiosInstance';
import { LoaderContext, ModalContext, UserContext } from '../context';
import DataTable from 'react-data-table-component';
import { Trash } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Loader from './Loader';

const customStyles = {
  table: {
    style: {
      border: '1px solid #ccc',
    },
  },
  rows: {
    style: {
      // minHeight: '72px', // Example: adjust as needed
    },
  },
  headCells: {
    style: {
      borderLeft: '1px solid #ccc',
    },
  },
  cells: {
    style: {
      borderLeft: '1px solid #ccc',
    },
  },
};

const DatatableCompo = () => {
  const [patientData, setPatientData] = useState([]);
  const { userData, setUserData } = useContext(UserContext); // Get userData and setUserData from context
  const { loading, setLoading } = useContext(LoaderContext);
  const { open, setOpen } = useContext(ModalContext);
  const [search, setSearch] = useState(''); // Initialize search with an empty string
  const [filteredData, setFilteredData] = useState([]);

  // Get user from localStorage once and store it in a local variable if needed immediately
  // It's better to rely on userData from context once it's set
  const userFromLocalStorage = JSON.parse(localStorage.getItem("user")); 

  // console.log("fd", filteredData);

  const deleteData = async (id) => {
    try {
      console.log(id);
      const deleteRow = await axios.delete(`/data/delete/${id}`);
      fetchData(); // Re-fetch data after deletion
      toast.success(deleteRow.data.message);
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  // Effect to set userData from localStorage when the component mounts
  // This ensures userData in context is updated early
  useEffect(() => {
    if (userFromLocalStorage) { // Check if user data exists in local storage
      setUserData(userFromLocalStorage);
    }
  }, []); // Run once on component mount

  // console.log("dt userdata", userData);

  const fetchData = async () => {
    setLoading(true);
    console.log("data fetching starting");
    try {
      // Ensure userData is available before making the API call
        // const data = await axios.post('/data/get', { userId: userData._id });
        const data = await axios.get('/data/get');

        // console.log("data", data.data);
        setPatientData(data.data);
        setFilteredData(data.data);
        // console.warn("User ID not available, cannot fetch data.");
    } catch (err) {
      console.error("Error fetching data:", err);
      if (err.response && err.response.status === 401) {
          toast.error("Unauthorized: Please log in again.");
          console.log(err.response.data)
      } else {
          toast.error("Failed to fetch data.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Effect to fetch data when userData changes or modal state changes
  // This is the crucial part: fetchData will only run when userData._id is present
  useEffect(() => {
    if (userData && userData._id) { // Only fetch if userData and its _id are present
      fetchData();
    }
  }, [userData, open]); // Depend on userData and open

  // Effect for search filtering
  useEffect(() => {
    if (search) { // Only filter if search has a value
      const result = patientData.filter((data) =>
        data.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredData(result);
    } else {
      setFilteredData(patientData); // If search is empty, show all patient data
    }
  }, [search, patientData]); // Depend on search and patientData

  const columnsData = [
    {
      name: 'S.No.',
      selector: (row, index) => index + 1,
    },
    {
      name: 'Name',
      selector: (row) => (
        <Link to={`/${row._id}`} className='text-blue-500'>
          {row.name}{' '}
        </Link>
      ),
      sortable: true,
    },
    {
      name: 'Gender',
      selector: (row) => row.gender,
      sortable: true,
    },
    {
      name: 'Age',
      selector: (row) => row.age,
      sortable: true,
    },
    {
      name: 'Doctor Name',
      selector: (row) => row.doctor,
      sortable: true,
    },
    {
      name: 'Action',
      selector: (row) => (
        <button
          className='text-red-500 text-md p-2 bg-gray-100 rounded-full'
          onClick={() => deleteData(row._id)}
        >
          <Trash size={20} />
        </button>
      ),
    },
  ];

  return (
    <>
      <div className="add-header w-full flex justify-between md:flex-row flex-col-reverse my-4 items-center ">
        <input
          type='text'
          placeholder='Search Patients By Name'
          className='md:w-[50%] border border-gray-400 px-2 h-[7vh] text-md outline-none my-4 rounded-md w-full '
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className='bg-blue-500 text-white py-0 rounded-md px-8 font-bold inline-block h-[7vh] w-1/2 md:w-auto'
          onClick={() => setOpen(true)}
        >
          Add Data
        </button>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <DataTable
          className='w-full md:w-[80vw]'
          columns={columnsData}
          data={filteredData}
          pagination
          highlightOnHover
          customStyles={customStyles}
        />
      )}
    </>
  );
};

export default DatatableCompo;