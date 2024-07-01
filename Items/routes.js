const itemroute = require("express").Router();
const {
  addItem,
  getAllFood,
  getfood,
  getfoodByCategory,
  getfoodsByVeg,
  getfoodsByNonVeg,
  getfoodsByVegRes,
  getfoodsByNonVegRes,
} = require("./controllers");

itemroute.post("/additem", addItem);

// get all food based on particular resturant (restuarant id)

itemroute.post("/getAllFood", getAllFood);

// get food by food id

itemroute.get("/getfood/:_id", getfood);

// get food by their category

itemroute.get("/getfoodByCategory/:category", getfoodByCategory);

// get food by their veg category

itemroute.get("/getfoodsByVeg",getfoodsByVeg);

// get food by their nonveg category

itemroute.get("/getfoodsByNonVeg",getfoodsByNonVeg);

// get food by their veg category and restuarnt id

itemroute.get("/getfoodsByVegRes/:_id",getfoodsByVegRes);

// get food by their nonveg category and restuarnt id

itemroute.get("/getfoodsByNonVegRes/:_id",getfoodsByNonVegRes);

module.exports = { itemroute };
