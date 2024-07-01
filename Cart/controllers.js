const Cart=require("./model");
const {addorder}=require("../orders/controllers");
const addcartitems=async(req,res)=>{
    try {
        console.log("addcartitems");
        const {cart,userId,amountoff}=req.body;
        console.log(cart,userId,amountoff);
        let addcart=await Cart.create({
            userId:userId,
        });

        let resId="";
        var amount=0;
        var totalAmount=0;
        cart.map(async(val)=>{
            amount+=val.price*val.quantity;
            console.log("amount is : ",amount);
            const Items=[
                {
                    itemimg:val.photo,
                    itemId:val._id,
                    itemname:val.name,
                    quantity:val.quantity,
                    price:val.price,
                    totalPrice:val.price*val.quantity    
                }
            ]
            resId=val.restaurant;
            // addcart.items.push(Items);
            await Cart.updateOne({_id:addcart._id},{
                $push:{items:Items}
            })       
        })
        await Cart.updateMany({_id:addcart._id},{
            amount:amount,
            amountoff:amountoff,
            totalAmount:totalAmount
        },
        {
            new:true
        })

        if(addcart)
        {
            // console.log(userId," ",resId," ",addcart._id);
            // return res.status(201).json({
            //     message:"item pushed",
            //     data:addcart
            // })
            // console.log("add to cart is : ",addcart);
            const data={
                userId:userId,
                resId:resId,
                cartId:addcart._id,
            }
             addorder(data);
             return res.status(201).json({
                message:"item pushed",
                data:addcart
            })
        }else{
            return res.status(400).json({
                message:"something went wrong!! can not push item"
            })
        }    
    } catch (error) {
        console.log(error);
        console.log("error while addcartitems");
    }
}

const updatecartitems=async(req,res)=>{
    try {
        const {cartid}=req.params;
        const {items}=req.body;
        const updatecart=await Cart.updateOne({
            _id:cartid
        },
        {
            $set:{
                items:{
                    items
                }
            }
        }
        );
      if(updatecart)
      {
        return res.status(200).json({
            message:"cart updated",
            data:updatecart
        })
      }else{
        return res.status(400).json({
            message:"cart can not updated"
        })
      }   
    } catch (error) {
        console.log("error while update cart items");
    }
}

const getcart=async(req,res)=>{
    try {
        const {userid}=req.params;
        const findcart=await Cart.findOne({userId:userid});
        if(findcart)
        {
            return res.status(200).json({
                message:"getting cart",
                data:findcart
            })
        }else{
            return res.status(400).json({
                message:"can not get cart or nothing to show!!"
            })
        }
    }catch (error) {
       console.log("error while getting cart");
    }
}

const deletecart=async(req,res)=>{
    try {
        const {cartid}=req.params;
        const deletecarts=await Cart.findOneAndDelete({_id:cartid});
        if(deletecarts)
        {
            return res.status(200).json({
                message:"cart delete success",
                data:deletecarts
            })
        }else{
            return res.status(400).json({
                message:"can not delete cart"
            })
        }
    } catch (error) {
        console.log("error while delete whole cart");
    }
}

module.exports={
    addcartitems,
    updatecartitems,
    getcart,
    deletecart,
}