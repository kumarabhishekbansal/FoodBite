import axios from "axios";

let API_URL="/orders/";

const getresorders=async(_id)=>{
    // console.log("enter getresorders react with id : ",_id);
    const response=await axios.get(API_URL+`/getresorders/${_id}`);
    if(response.status!==200 && response.status!==201 && response.data.message)
    {
        // console.log("getresorders response ",response);
        return Promise.reject(response.data.message);
    }else if(response.status===200 || response.status===200){
        return Promise.resolve(response.data);
    }
    return response.data;
}


const updateorders=async(datas)=>{
    console.log("enter updateorders react with id : ",datas);
    const _id=datas._id;
    const data={order_id:datas.order_id,orderstatus:datas.orderstatus};
    console.log(data);
    const response=await axios.post(API_URL+`updateorders/${_id}`,data);
    if(response.status!==200 && response.status!==201)
    {
        return Promise.reject(response.data.message);
    }else if(response.status===200 || response.status===200){
        return Promise.resolve(response.data);
    }
    return response.data;
}


const ResOrderService={
    getresorders,
    updateorders
}

export default ResOrderService;

