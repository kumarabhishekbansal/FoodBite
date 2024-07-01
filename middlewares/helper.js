const User=require("../User/model");

var isAdmin=false;
const findadmin=async(req,res)=>{
    try {
        const {user}=req.body;
    const Admin=await User.findById(user._id);
    isAdmin=Admin.isAdmin;
    console.log(isAdmin);
    if(Admin)
    {
        return true;
    }else{
        return res.status(400).json({
            message:"no user found"
        })
    }
    } catch (error) {
        console.log("error while getting admin or not in resturant routes js");
        console.log(error);
    }
}
module.exports={findadmin};