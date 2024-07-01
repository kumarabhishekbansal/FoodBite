import axios from 'axios';

let API_URL='/api/res/';

// register

const register=async(resdata)=>{
    console.log("API_URL : ",API_URL);
    const response=await axios.post(API_URL+'register',resdata);
    console.log("response is : ",response);
    if(response.status!==200 && response.status!==201)
    {
        // console.log("Response error register : ",response.data.error);
        return Promise.reject(response.data.message);
    }
    else if(response.data && response.status===201)
    {
        return Promise.resolve(response.data);
    }
    return response.data;    
}

const getalladminres=async(userid)=>{
    console.log("API_URL : ",API_URL);
    // console.log("id is ",id);
    const _id={userid:userid};
    // console.log(userid);
    const response=await axios.post(API_URL+'GetAllRes',_id);
    console.log("response is : ",response);
    if(response.status!==200 && response.status!==201)
    {
        // console.log("Response error register : ",response.data.error);
        return Promise.reject(response.data.message);
    }
    else if(response.data && response.status===200)
    {
        localStorage.setItem('adminresdata',JSON.stringify(response.data.data))
        return Promise.resolve(response.data);
    }
    return response.data;
}


const updatevacancies=async(data)=>{
    console.log("updatevacancies data ",data);
    const response=await axios.patch(API_URL+'updatevacancies',data);
    console.log("updatevacancies Response is: ",response);
    if(response.status!==200 && response.status!==201)
    {
        return Promise.reject(response.data.message);
    }else if(response.data && response.status===200)
    {
        return Promise.resolve(response.data);
    }
    return response.data;
}

const getAllRes=async(zipcode)=>{
    const data={zipcode:zipcode}
    const response=await axios.post(API_URL+'Resturants',data);
    if(response.status!==200 && response.status!==201)
    {
        return Promise.reject(response.data.message);
    }else if(response.data && response.status===200)
    {
        return Promise.resolve(response.data);
    }
    return response.data;

}

const AddResModalService={
    register,
    getalladminres,
    updatevacancies,
    getAllRes
}   

export default AddResModalService;