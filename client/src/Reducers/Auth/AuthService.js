import { responsiveFontSizes } from '@mui/material';
import axios from 'axios';

let API_URL='/api/user/';

// register

const register=async(userdata)=>{
    console.log("API_URL : ",API_URL);
    const response=await axios.post(API_URL+'register',userdata);
    console.log("response is : ",response);
    if(response.status!==200 && response.status!==201)
    {
        // console.log("Response error register : ",response.data.error);
        return Promise.reject(response.data.message);
    }
    else if(response.data && response.status===201)
    {
        localStorage.setItem('customer',JSON.stringify(response.data));
        return Promise.resolve(response.data);
    }
    return response.data;    
}

const login=async(userdata)=>{
    const response=await axios.post(API_URL+'login',userdata);

    console.log("response is : ",response);
    if(response.status!==200 && response.status!==201)
    {
        // console.log("Response error register : ",response.data.error);
        return Promise.reject(response.data.message);
    }
    else if(response.data && response.status===200)
    {
        localStorage.setItem('customer',JSON.stringify(response.data));
        return Promise.resolve(response.data);
    }
    return response.data;  
}
const logout=async()=>{
    localStorage.removeItem('customer');
}

const makeadmin=async(userid)=>{
    // console.log("enter make admin auth service with user id : ",{userid});
    const _id={userid:userid};
    const response=await axios.post(API_URL+'makeadmin',_id);
    // console.log("response is : ",response);
    if(response.status!==200)
    {
        return Promise.reject(response.data.message);
    }else if(response.data && response.status===200){
        localStorage.removeItem('customer');
        localStorage.setItem('customer',JSON.stringify(response.data));
        return Promise.resolve(response.data);
    }
    return response.data;
}

const addcashbackpoints=async(pointdata)=>{
    const response=await axios.patch(API_URL+'addcashbackpoints',pointdata);
    console.log("response is : ",response);
    if(response.status!==200)
    {
        return Promise.reject(response.data.message);
    }else if(response.data && response.status===200){
        // localStorage.removeItem('cashbackpoints');

        return Promise.resolve(response.data);
    }
    return response.data;
}


const getuser=async(id)=>{
    console.log("enter get user auth service");
    const data={id:id};
    console.log("Data is ",data);
    const response=await axios.post(API_URL+'getuser',data);
    console.log("response is : ",response);
    if(response.status!==200)
    {
        return Promise.reject(response.data.message);
    }else if(response.data && response.status===200){
        localStorage.removeItem('customer');
        localStorage.setItem('customer',JSON.stringify(response.data));
        return Promise.resolve(response.data);
    }
    return response.data;
}

const AuthService={
    register,
    login,
    logout,
    makeadmin,
    addcashbackpoints,
    getuser
}

export default AuthService;