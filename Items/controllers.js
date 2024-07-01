const Item = require("./model");
// const {generateimage}=require("../ThreeDimage/controllers");
//  add items
// step1 -> getting all data from user req.body
// step2 -> go on for admin validation and then simply save and return that data

const addItem = async (req, res) => {
  try {
    console.log("enter add item");
    const { photo,name, isVeg, isContainsEgg, category, price, restaurant } =
      req.body;
    console.log(photo,name, isVeg, isContainsEgg, category, price, restaurant);
    if (!photo || !name || !category  || !price || !restaurant) {
      return res.status(400).json({
        message: "Please filled all values properly..",
      });
    }

    const datasave = await Item.create({
      photo:photo,
      name: name,
      isVeg: isVeg,
      isContainsEgg: isContainsEgg,
      category: category,
      price: price,
      restaurant: restaurant,
    });
    await datasave.save();
    if (datasave) {
      return res.status(201).json({
        message: "Data Saved",
        data: datasave,
      });
    } else {
      return res.status(400).json({
        message: "Can not saved data",
      });
    }
  } catch (error) {
    console.log("error while adding item in restuarant");
    console.log(error);
  }
};

// get food for user based on selecting resturant
// step1 -> get id from user and based on that id find all food of that restuarnat
//  step2-> return that all foods which are saved in array

const getAllFood = async (req, res) => {
  try {
    console.log("enter node get all food");
    const { id } = req.body;
    // console.log(id);
    const getfoods = await Item.find({ restaurant: id });
    if (getfoods) {
      // console.log(getfoods);
      return res.status(200).json({
        message: "Getting all foods",
        data: getfoods,
      });
    } else {
      return res.status(400).json({
        message: "Nothing to show!!",
      });
    }
  } catch (error) {
    console.log("error while getting get all food for user");
  }
};

// food by food id
// step1 -> get food id from user (when user clicks on history food section or somewhere else)
// step2 -> search if id is present or not
// step3-> if id is present return that food item

const getfood = async (req, res) => {
  try {
    const { _id } = req.params;
    const getfood = await Item.findById(_id);
    if (getfood) {
      return res.status(200).json({
        message: "Getting food",
        data: getfood,
      });
    } else {
      return res.status(400).json({
        message: "Nothing to show!!",
      });
    }
  } catch (error) {
    console.log("Error while getting food ");
  }
};

// get food by food category
// step1 -> get category from user by params and find that category
//  step2 -> after finding returns all food by their category

const getfoodByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const getfoods = await Item.find({
      category: { $regex: category, $options: "i" },
    });
    if (getfoods) {
      return res.status(200).json({
        message: "Getting all foods",
        data: getfoods,
      });
    } else {
      return res.status(400).json({
        message: "Nothing to show!!",
      });
    }
  } catch (error) {
    console.log("Error while getting getfoodByCategory for user");
  }
};

// get food by veg category
// step1 ->get vegcategory option from user
// step2 -> find all veg items from items model and then return them all

const getfoodsByVeg = async (req, res) => {
  try {
    const findfoods = await Item.find({
      isVeg: true,
    });
    if (findfoods) {
      return res.status(200).json({
        message: "Getting food",
        data: findfoods,
      });
    } else {
      return res.status(400).json({
        message: "Nothing to show!!",
      });
    }
  } catch (error) {
    console.log("Error while getting all food by veg");
  }
};

// get food by nonveg category
// step1 ->get nonvegcategory option from user
// step2 -> find all nonveg items from items model and then return them all

const getfoodsByNonVeg = async (req, res) => {
  try {
    const findfoods = await Item.find({
      isContainsEgg: true,
    });
    if (findfoods) {
      return res.status(200).json({
        message: "Getting food",
        data: findfoods,
      });
    } else {
      return res.status(400).json({
        message: "Nothing to show!!",
      });
    }
  } catch (error) {
    console.log("Error while getting all food by Nonveg");
  }
};

// get food by veg category based on particular restuarant
// step1 ->get vegcategory option from user
// step2 -> find all veg items from items model and then return them all

const getfoodsByVegRes = async (req, res) => {
  try {
    const { _id } = req.params;
    const findfoods = await Item.find({
      $and: [
        {
          restaurant: { $eq: _id },
        },
        {
          isVeg: { $eq: true },
        },
      ],
    });
    if (findfoods) {
      return res.status(200).json({
        message: "Getting food",
        data: findfoods,
      });
    } else {
      return res.status(400).json({
        message: "Nothing to show!!",
      });
    }
  } catch (error) {
    console.log("Error while getting all food by veg");
  }
};

// get food by nonveg category based on particular restuarant
// step1 ->get nonvegcategory option from user
// step2 -> find all nonveg items from items model and then return them all

const getfoodsByNonVegRes = async (req, res) => {
  try {
    const { _id } = req.params;
    const findfoods = await Item.find({
      $and: [
        {
          restaurant: { $eq: _id },
        },
        {
          isContainsEgg: { $eq: true },
        },
      ],
    });
    if (findfoods) {
      return res.status(200).json({
        message: "Getting food",
        data: findfoods,
      });
    } else {
      return res.status(400).json({
        message: "Nothing to show!!",
      });
    }
  } catch (error) {
    console.log("Error while getting all food by veg");
  }
};

module.exports = {
  addItem,
  getAllFood,
  getfood,
  getfoodByCategory,
  getfoodsByVeg,
  getfoodsByNonVeg,
  getfoodsByVegRes,
  getfoodsByNonVegRes,
};
