const cartroute=require("express").Router();
const{
    addcartitems,
    updatecartitems,
    getcart,
    deletecart,
}=require("./controllers")

// add item for an user id

cartroute.post("/addcartitems",addcartitems);

// update item by cart id
// update whole cart by redux and then the array will pass to this function

cartroute.put("/updatecartitems/:cartid",updatecartitems);

// delete item by cart id and user id and item id

// cartroute.delete("/deletecartitems/:cartid/:userid/itemid",deletecartitems);

// get cart by user id

cartroute.get("/getcart/:userid",getcart);

// delete whole cart by cart id

cartroute.delete("/deletecart/:cartid",deletecart);

module.exports={cartroute};