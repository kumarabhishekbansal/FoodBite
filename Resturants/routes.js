const resturantroute = require("express").Router();
const {
  register,
  login,
  logout,
  addadmin,
  getAllResAdmin,
  getResDetails,
  getAllRes,
  getResById,
  getResBySearch,
  updatevacancies,
  addrecipe,
  getallrestuarant,
  updateres,
  addstars
} = require("./controllers");
const { userauth } = require("../middlewares/UserAuth");
const { Resauth } = require("../middlewares/ResAuth");
// resturantroute.get("/getres", Resauth, getResDetails);
resturantroute.post("/register", register);
resturantroute.post("/login", login);
resturantroute.post("/logout", Resauth, logout);
resturantroute.patch("/addadmin", Resauth, addadmin);

// update vacancies list

resturantroute.patch("/updatevacancies", updatevacancies);

// get all restuarant for admin

resturantroute.post("/GetAllRes", getAllResAdmin);

// get all resturants

resturantroute.post("/Resturants", getAllRes);

// Get individual restaurant details based on id

resturantroute.get("/:_id", getResById);

// search

resturantroute.post("/search", getResBySearch);

// add recipies to restuarant

resturantroute.post("/addrecipe",addrecipe);

// get all restuarant without regardless of any city

resturantroute.post("/getallrestuarant",getallrestuarant)

// update data

resturantroute.patch("/updateres",updateres)

// add star ratings by user id

resturantroute.post("/addstars/:_id",addstars);

module.exports = { resturantroute };
