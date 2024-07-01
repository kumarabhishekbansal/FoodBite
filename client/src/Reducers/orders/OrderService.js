import axios from "axios";
const API_URL='/orders/'

const findorders=async(id)=>{
    console.log("enter findorders order service");
    const data={id:id};
    const response=await axios.post(API_URL+"findorders",data);
    if(response.status!==200 && response.status!==201)
    {
        return Promise.reject(response.data.message);
    }else if(response.data || response.status===200)
    {
        localStorage.setItem("userorders",JSON.stringify(response.data));
        return Promise.resolve(response.data);
    }
}

const OrderService={
    findorders
}

export default OrderService;