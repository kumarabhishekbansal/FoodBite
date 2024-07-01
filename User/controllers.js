const User = require("./model");
const validator = require("validator");
const { registerMail } = require("../mailer/mailer");
const register = async (req, res) => {
  try {
    console.log("enter register backened");
    const {
      username,
      email,
      password,
      confirmpassword,
      fullName,
      street,
      city,
      state,
      zipcode,
      phone,
      profile,
      dob,
    } = req.body;
    if (
      !username ||
      !email ||
      !password ||
      !confirmpassword ||
      !fullName ||
      !phone ||
      !street ||
      !city ||
      !zipcode ||
      !state ||
      !profile ||
      !dob
    ) {
      return res.status(400).json({
        message: "Please filled all values",
      });
    }

    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({
        message: "Please filled strong password ",
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        message: "Invalid email id",
      });
    }

    if (password != confirmpassword) {
      return res.status(400).json({
        message: "confirm password not matching",
      });
    }

    // if user alerady exits

    const finduser = await User.findOne({ email: email });
    if (finduser) {
      return res.status(402).json({
        message: "user already exists please login",
      });
    }
    const address = street + "," + state;
    const role = "customer";
    const isAdmin = false;
    var usercreate = await User.create({
      username: username,
      email: email,
      password,
      confirmpassword,
      fullName: fullName,
      address: address,
      phone: phone,
      role: role,
      isAdmin: isAdmin,
      profile: profile,
      zipcode: zipcode,
      city: city,
      dob: dob,
    });

    // password hashing
    usercreate = await usercreate.save();
    const token = usercreate.genereatetoken(usercreate._id);
    res.cookie("usertoken", token, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    });
    if (usercreate) {
      registerMail(usercreate, "Registeration successfull");
      return res.status(201).json({
        message: "register success",
        data: usercreate,
        token: token,
      });
    } else {
      return res.status(400).json({
        message: "register failed",
      });
    }
  } catch (error) {
    console.log("error in register user");
    // console.log(error);
  }
};

const login = async (req, res) => {
  try {
    console.log("enter login backend");
    const { email, password } = req.body;

    const isUserExist = await User.findOne({ email: email });

    if (!isUserExist) {
      return res.status(400).json({ message: "This email does not exist." });
    }

    if (!isUserExist.authenticate(password)) {
      return res.status(400).json({ message: "This password does not exist." });
    }
    const token = isUserExist.genereatetoken(isUserExist._id);
    res.cookie("usertoken", token, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    });
    // req.foodtoken=token;
    // req.body.userexist = isUserExist;
    // req.body.foodtoken = token;
    return res
      .status(200)
      .json({ status: "LoggedIN", data: isUserExist, token: token });
  } catch (error) {
    console.log("error in login user");
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("usertoken");
    return res.send("logout success");
  } catch (error) {
    console.log("error in logout user");
  }
};

const makeAdmin = async (req, res) => {
  try {
    console.log("enter make admin user controller");
    const { userid } = req.body;
    // console.log("user id : ",userid);
    let updateadmin = await User.updateOne(
      {
        _id: userid,
      },
      { role: "Admin", isAdmin: true }
    );
    updateadmin = await User.findById({ _id: userid });
    if (updateadmin) {
      return res.status(200).json({
        message: "data updated",
        data: updateadmin,
      });
    } else {
      return res.status(400).json({
        message: "data can not be",
      });
    }
  } catch (error) {
    console.log(error);
    console.log("error while making admin");
  }
};

const addcashbackpoints = async (req, res) => {
  try {
    console.log("enter addcashbackpoints");
    const { userId, points } = req.body;
    console.log("points ", points);
    let findpoint;

    // const actualpoints=findpoint.cashbackpoints;
    const pointupdate = await User.findByIdAndUpdate(
      { _id: userId },
      { cashbackpoints: points }
    );
    findpoint = await User.findById({ _id: userId });
    // console.log(findpoint);
    return res.status(200).json({
      message: "points updated",
      data: findpoint,
    });
  } catch (error) {
    console.log("error while getting addcashbackpoints");
  }
};

const getuser=async(req,res)=>{
  try {
    console.log("enter getuser");
    const {id}=req.body;
    // console.log(id);
    const userfind=await User.findById({_id:id});
    if(userfind)
    {
      return res.status(200).json({
        message:"getting user",
        data:userfind
      })
    }
    return res.status(400).json({
      message:"error while getting user"
    })
  } catch (error) {
    console.log(error);
    console.log("error while getting getuser");
  }
}

module.exports = {
  register,
  login,
  logout,
  makeAdmin,
  addcashbackpoints,
  getuser,
};
