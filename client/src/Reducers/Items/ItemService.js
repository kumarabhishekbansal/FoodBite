import axios from "axios";

let API_URL = "/api/item/";

// register

const additem = async (itemdata) => {
  console.log("API_URL : ", API_URL);
  console.log("itemdata is : ", itemdata);
  const response = await axios.post(API_URL + "additem", itemdata);
  console.log("response is : ", response);
  if (response.status !== 200 && response.status !== 201) {
    // console.log("Response error register : ",response.data.error);
    return Promise.reject(response.data.message);
  } else if (response.data && response.status === 201) {
    return Promise.resolve(response.data);
  }
  return response.data;
};

const getAllFood = async (id) => {
  console.log("enter react get all food");
  const data = { id: id };
  const response = await axios.post(API_URL + "getAllFood", data);
  if (response.status !== 200 && response.status !== 201) {
    // console.log("Response error register : ",response.data.error);
    return Promise.reject(response.data.message);
  } else if (response.data || response.status === 200) {
    console.log(response.data);
    return Promise.resolve(response.data);
  }
  return response.data;
};

const ItemService = {
  additem,
  getAllFood
};

export default ItemService;
