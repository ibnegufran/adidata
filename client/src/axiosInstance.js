import axios from 'axios';

const token=localStorage.getItem('token');

if(token){
    axios.defaults.headers.common['Authorization']=token;
}

axios.defaults.baseURL='http://localhost:5000/api/v1/';

// axios.defaults.baseURL='https://adidata.onrender.com/api/v1/';


export default axios;