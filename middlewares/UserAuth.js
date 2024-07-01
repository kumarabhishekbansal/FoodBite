const jwt=require("jsonwebtoken");
const User=require('../User/model');
const Restaurant=require('../Resturants/model');
// const Admin=require("../Admin/model");

const userauth=async(req,res,next)=>{
    try {
        // const foodtoken=req.cookie.foodtoken;
        const usertoken=req.headers.authorization;

        if(!usertoken)
        {
            return res.status(400).json({
                message:"token not found",
                next:next()
            })
        }
        // console.log(usertoken);

        const verified=jwt.verify(usertoken,process.env.SECRET_KEY);
        if(!verified) 
        {
            return res.status(400).json({
                message:"token not verified",
                next:next()
            })
        }

        const user=await User.findById(verified._id);

        if(user)
        {
            req.body.user=user;
            req.body.usertoken=usertoken;
            return next();
        }

        return res.status(400).json({
            message:"user not found from userauth"
        })


    } catch (error) {
        console.log("error in user authentication");
        console.log(error);
    }
}

module.exports={userauth};