const userroute = require("express").Router();
const { register, login, logout, makeAdmin,addcashbackpoints,getuser } = require("./controllers");
const { userauth } = require("../middlewares/UserAuth");

userroute.post("/register", register);
userroute.post("/login", login);
userroute.post("/logout", userauth, logout);
userroute.post("/makeadmin",makeAdmin);

userroute.post("/getuser",getuser);

// add cashback points

userroute.patch("/addcashbackpoints",addcashbackpoints)
module.exports = { userroute };
