const Restaurant = require("./model");
const validator = require("validator");
const User = require("../User/model");

// add data   register
// step 1-> fetch all details about resturant and take user id from the cookie
// step2 -> checks if restruant email id or trademark exists or not
// step3 -> if trademark is does nit exist then add all details to new one database or create and save
// step4 -> before saving details to database make that user admin or owner of that particular resturant
const register = async (req, res) => {
  try {
    console.log("enter register page of res");
    const {
      userid,
      trademark,
      email,
      street,
      city,
      state,
      zipcode,
      phone,
      openHours,
      closeHours,
      description,
      profile,
      category
    } = req.body;

    // console.log(userid,
    //   trademark,
    //   email,
    //   street,
    //   city,
    //   state,
    //   zipcode,
    //   phone,
    //   openHours,
    //   closeHours,
    //   description);
    if (
      !trademark ||
      !email ||
      !street ||
      !city ||
      !state ||
      !zipcode ||
      !phone ||
      !description ||
      !profile ||
      !category
    ) {
      return res.status(400).json({
        message: "please filled all fields",
      });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        message: "Invalid email id",
      });
    }
    const findres = await Restaurant.findOne({ email: email });
    if (findres) {
      return res.status(402).json({
        message: "resturant email already exists",
      });
    }

    const findtrademark = await Restaurant.findOne({ trademark: trademark });
    if (findtrademark) {
      return res.status(402).json({
        message: "TradeMark exists already !!",
      });
    }
    let address=street+" , "+state;
    let resturantcreate = await Restaurant.create({
      trademark:trademark,
      email:email,
      address:address,
      phone:phone,
      openHours:openHours,
      closeHours:closeHours,
      description:description,
      zipcode:zipcode,
      profile:profile,
      city:city,
      category:category,
    });
    

    resturantcreate = await resturantcreate.save();

    if (resturantcreate) {

      resturantcreate=await Restaurant.updateOne({
        _id:resturantcreate._id
      },{
        $push:{owners:userid}
      }
      )
      // await Restaurant.save();
      // resturantcreate=await Restaurant.findById({_id:resturantcreate._id});
      return res.status(200).json({
        message: "register success",
        data: resturantcreate,
      });
    } else {
      return res.status(400).json({
        message: "register failed",
      });
    }
  } catch (error) {
    console.log("error in resturant register");
    console.log(error);
  }
};


// login 
// step1->login by resturant email id and password
// step2->after login token generates
// step3->by token we can fetch all details about that resturant also fetch the owners of that resturant

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const isResExist = await Restaurant.findOne({ email: email });

    if (!isResExist) {
      return res.json({ error: "This email does not exist please register." });
    }

    if (!isResExist.authenticate(password)) {
      return res.json({ error: "This password does not exist." });
    }
    const token = isResExist.genereatetoken(isResExist._id);
    res.cookie("restoken", token, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    });
    return res
      .status(200)
      .json({ status: "LoggedIN", isResExist, token: token });
  } catch (error) {
    console.log("error in login register");
  }
};


// logout from resturant cookies


const logout = async (req, res) => {
  try {
  } catch (error) {
    console.log("error in login register");
  }
};



// add admin
// first->jisko admin bnana hai usko phele hmari website pe as a user sign in krna pdega
// second-> owner of that particluar resturant can make others admin and vo jo add hogga vo bhi owner bn jayega
// third -> owner fill the id of that user and that user becomes the admin
// fourth-> jaise maine sumit ko admin bnana hai toh mai resturant email id se register krunga and resturant ki id ke owners list mein usko jo ab add honna chata hai usko add krdunga


const addadmin = async (req,res) => {
  try {
    const {rest,adminid} = req.body;
    const finduser = await User.findById(adminid);
    if (!finduser) {
      return res.status(402).json({
        message:
          "user not found",
      });
    }
    // console.log("Res id is :",res._id);
    const updatedata={"role":"Admin","isAdmin":true};
    const getupdated=await User.findByIdAndUpdate(adminid,updatedata);
    const dataupdate = await Restaurant.findOneAndUpdate(
      { _id: rest._id },
      { $addToSet: { owners: adminid } },
      { new: true }
    ).populate('owners');

    if(!dataupdate)
    {
      return res.status(402).json({
        message:"resturant data owners list not updated"
      })
    }
    return res.status(200).json({
        message:"successfully added",
        userupdatedata:getupdated,
        resdataupdate:dataupdate
      })
    }
   catch (error) {
    console.log("error while adding admin (addadmin in resturants)");
    // console.log(error);
  }
};


// get resturant details
// step1->take resturant id from cookie
//  step2-> fetch all details from that id
// step3->fetch all owners from that res id using populate function


const getResDetails=async(req,res)=>{
  try {
    const {res}=req.body;
    const findres=await Resturant.findById(res._id).populate();
    if(!findres){
      return res.status(402).json({
        message:"either resturant not find or you have no rights "
      });
    }
    return res.status(200).json({
      message:"getting resturant data success",
      data:findres
    });
  } catch (error) {
    console.log("error while getting res details");
  }
}



// const errorpermission=async(req,res)=>{
//     try {
//         return res.status(402).json({
//             message:"Either Bad request or you have no access to see this page",
//             status:"402"
//         })
//     } catch (error) {
//         console.log("error while error permission in resturants controller");
//     }
// }


// get all resturants
// step1 -> get city from  user by req.query
// step2 -> select all resturants from that city and return them

const getAllRes=async(req,res)=>{
  try {
    console.log("enter getAllRes");
    const {zipcode}=req.body;
    // console.log(zipcode);
    const findall=await Restaurant.find({zipcode:zipcode});
    // console.log(findall);
    if(findall)
    {
      return res.status(200).json({
        message:"Getting Resturants",
        data:findall
      })
    }else{
      return res.status(400).json({
        message:"Sorry!! Nothing to show"
      })
    }
  } catch (error) {
    console.log("error while getting all resturant data by city ");
  }
}

// get resturant in detail when user click on particular resturant
// step1-> get id from user for that particular restaurant
// step2-> search for that restuarant and then return it

const getResById=async(req,res)=>{
  try {
    const {_id}=req.body;
    const findres=await Restaurant.findById(_id);
    if(findres)
    {
      return res.status(200).json({
        message:"Getting Resturant Detail",
        data:findres
      })
    }else{
      return res.status(400).json({
        message:"Sorry!! Nothing to show"
      })
    }
  } catch (error) {
    console.log("error while getting restaurant in detail from their id");
  }
}

// get restuarant by search
// step1 -> get name of that restuurant and find that name from 
// model and then return that res

const getResBySearch=async(req,res)=>{
  try {
    console.log("getResBySearch");
    const searchString=req.body.searchcity;
    // console.log(searchString);
    const searchres=await Restaurant.find({
      $or:[
        {trademark:{$regex:searchString,$options:'i'}},
        {city:{$regex:searchString,$options:'i'}}
        // {trademark:{$eq:searchString}},
        // {city:{$eq:searchString}}
      ] 
    })
    if(searchres)
    {
      // console.log(searchres);
      return res.status(200).json({
        message:"Getting restuarant",
        data:searchres
      })
    }
    else{
      return res.status(404).json({
         message: `No Restaurant matched with ${searchString}`
      });
    }
  } catch (error) {
    console.log("error while getting restuarant by searching");
  }
}

// get all resturants which are belong to that particular resturants
// who have logged in and if that logged in user is admin for some
// particular resturants
// step1-> get user id from cookies
// step2 -> check if that user have role of admin or not and then find that user id from owners id
// step3-> admin can have more than one registered restuarnts
// step4-> returns array of resturants

const getAllResAdmin=async(req,res)=>{
  try {
    console.log("enter getAllResAdmin");
    // console.log(req.body);
    const {userid}=req.body;
    // const findres=await Restaurant.aggregate([
    //   {
    //     $project:{
    //       owners:{
    //         $filter:{
    //           input:"$owners",
    //            as:"item",
    //           cond:{$eq:["$$item",userid]}
    //         }
    //       }
    //     }
    //   }
    // ])

    // const findres=await Restaurant.find({owners:{$elemMatch:{userid}}});

    // const findres=await Resturant.find({$match:{'owners.userid':userid}})
    
    // const findres=await Restaurant.aggregate([
    //   {$match:{owners:userid}}
    // ]);

    // const findres=await Restaurant.aggregate.match({
    //   owners:{$in:[userid]}
    // });
    // console.log(userid);
    const findres=await Restaurant.find({
      owners:{$elemMatch:{$eq:userid}}
    });

    
    if(findres)
    {
      // console.log(findres);
      return res.status(200).json({
        message:"Getting all resturants for admin",
        data:findres
      })
    }else{
      return res.status(400).json({
        message:"Nothing to show",
      })
    }
  } catch (error) {
    console.log("error while getting all resturants for admin");
  }
}


const updatevacancies=async(req,res)=>{
  try {
    // console.log(req.body);
    const {resid,isvacancies}=req.body;
    // console.log(resid,isvacancies);
    const findres=await Restaurant.findByIdAndUpdate({_id:resid},{isvacancies:isvacancies});
    if(findres)
    {
      return res.status(200).json({
        message:"vacancy list updated",
        data:findres
      })
    }else{
      return res.status(400).json({
        message:"vacancy list can not be updated",
      })
    }

  } catch (error) {
    console.log("error occurs while updating vacacincies list..");
  }
}


const addrecipe=async(req,res)=>{
  try {
    const {itemname,itemdes,itemimg,iteming,itemdirection,itemprice}=req.body;

    if(!itemname || !itemdes || !itemimg || !iteming || !itemdirection || !itemprice)
    {
      return res.status(400).json({
        message:"Please enter all fields"
      });
    }

    const data={itemname,itemdes,itemimg,iteming,itemdirection,itemprice};

    const adddata=await Restaurant.updateOne()
  } catch (error) {
    console.log("error while adding recipies to restuarant");
  }
}

const getallrestuarant=async(req,res)=>{
  try {
    console.log("getallrestuarant");
    const findallres=await Restaurant.find({});
    if(findallres)
    {
      // console.log(findallres);
      return res.status(200).json({
        message:"getting data",
        data:findallres
      });
    }
    return res.status(400).json({
      message:"Nothing to show",
    });
  } catch (error) {
    console.log("error while getting getallrestuarant");
  }
}

const updateres=async(req,res)=>{
  try {
    const {data,id}=req.body;
    const updatedata=await Restaurant.findByIdAndUpdate({_id:id},data);
    if(updatedata)
    {
      return res.status(200).json({
        message:"Data updated",
        data:updatedata,
      })
    }
    return res.status(400).json({
      message:"Data can not be updated",
      
    })
  } catch (error) {
    console.log("error occur while updating restuarant data");
  }
}

const addstars=async(req,res)=>{
  try {
    console.log("enter add start");
    const {_id}=req.params;
    const {star,resId}=req.body;
    // console.log(_id,star,resId);
    const ress=await Restaurant.findById(resId);
    let alreadyrated=ress.ratings.find((userid)=>{
      console.log(userid.postedBy);
      if(userid.postedBy) return userid.postedBy.toString()===_id.toString()
    });
    if(alreadyrated)
    {
        const updaterating=await Restaurant.updateOne({
          ratings:{$elemMatch:alreadyrated},
        },
        {
          $set:{"ratings.$.star":star},
        },
        {
          new :true
        }
        );
         res.status(200).json({
          message:"ratings updated",
          data:updaterating
        })
    }else{
      const ratedres=await Restaurant.findByIdAndUpdate(resId,{
        $push:{ratings:{star:star,postedBy:_id}}
      },{new:true},
      );

       res.status(200).json({
        message:"Ratings add",
        data:ratedres
      })
    }

      const getallratings=await Restaurant.findById(resId);

      let totalRating=getallratings.ratings.length;
      let ratingsum=getallratings.ratings.map((item)=>item.star).reduce((prev,curr)=>prev+curr,0);
      let actualratings=Math.round(ratingsum/totalRating);
      let finalupdation=await Restaurant.findByIdAndUpdate(resId,{
        totalRating:actualratings
      }
      ,{
        new:true,
      });
      if(finalupdation)
      console.log(finalupdation);
      {
        return res.status(200).json({
          message:"final ratings updated",
          data:finalupdation
        })
      }

      
      
  } catch (error) {
    console.log(error);
   console.log("error while posting addstars"); 
  }
}

module.exports = {
  register,
  login,
  logout,
  addadmin,
  getResDetails,
  getAllRes,
  getResById,
  getResBySearch,
  getAllResAdmin,
  updatevacancies,
  addrecipe,
  getallrestuarant,
  updateres,
  addstars
};
