const mongoose = require("mongoose");
var CryptoJS = require("crypto-js");
var uuid = require("uuid");
const jwt = require("jsonwebtoken");
const restaurantSchema = new mongoose.Schema({
  owners: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  trademark: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  zipcode: {
    type: String,
  },
  phone: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  openHours: {
    type: String,
    default: "10:00 AM",
  },
  closeHours: {
    type: String,
    default: "10:00 PM",
  },
  isvacancies: {
    type: Boolean,
    default: false,
  },
  recipies: [
    {
      itemname: {
        type: String,
      },
      itemdes: {
        type: String,
      },
      itemimg: {
        type: String,
      },
      iteming: {
        type: String,
      },
      itemdirection: {
        type: String,
      },
      itemprice: {
        type: String,
      },
    },
  ],
  profile: {
    type: String,
  },
  category: {
    type: String,
    default: "both",
  },
  ratings: [
    {
      star: {
        type: Number,
        default: 0,
      },
      postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
  reviews: [
    {
      subject: {
        type: String,
      },
      postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
  totalRating:{
    type:String,
    default:0
  }
});

restaurantSchema.virtual("password").set(function (password) {
  this.key = uuid.v4();
  this.encry_password = this.securePassword(password);
});

restaurantSchema.methods = {
  authenticate: function (password) {
    return this.encry_password === this.securePassword(password);
  },

  securePassword: function (password) {
    var encry_password = CryptoJS.SHA256(password, this.key).toString();
    // console.log(encry_password, this.key, password);
    return encry_password;
  },
  genereatetoken: function (id) {
    return jwt.sign({ _id: id }, process.env.SECRET_KEY);
  },
};

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;
