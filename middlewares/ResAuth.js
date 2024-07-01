const jwt=require("jsonwebtoken");
const Restaurant=require('../Resturants/model');
const Resauth=async(req,res,next)=>{
    try {
        // const foodtoken=req.cookie.foodtoken;
        const restoken=req.headers.authorization;

        if(!restoken)
        {
            return res.status(400).json({
                message:"token not found",
                next:next()
            })
        }
        // console.log(restoken);

        const verified=jwt.verify(restoken,process.env.SECRET_KEY);
        if(!verified) 
        {
            return res.status(400).json({
                message:"token not verified",
                next:next()
            })
        }

        const owner=await Restaurant.findById(verified._id);

        if(owner)
        {
            req.body.rest=owner;
            req.body.restoken=restoken;
            return next();
        }

        return res.staus(400).json({
            message:"owner not found"
        })


    } catch (error) {
        console.log("error in res authentication");
        console.log(error);
    }
}

module.exports={Resauth};