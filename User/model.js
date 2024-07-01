const mongoose = require("mongoose");
var CryptoJS = require("crypto-js");
var uuid = require("uuid");
const jwt = require("jsonwebtoken");
const userschema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    encry_password: {
      type: String,
    },
    fullName: {
      type: String,
      required: true,
    },
    address:{
      type:String
    },
    city:{
      type:String
    },
    zipcode:{
      type:Number
    },
    profile: {
      type: String,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwallpapers.com%2Fcool-profile-pictures&psig=AOvVaw1PsSl4LJ-jJuDEdZ2TUt94&ust=1678106138685000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCJjOldTmxP0CFQAAAAAdAAAAABAJ",
    },
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    friendRequests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    sentRequests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    isAdmin:{
      type:Boolean,
      default:false
    },
    role:{
      type:String,
      default:"customer"
    },
    phone:{
      type:Number
    },
    streaks:{
      type:Number,
      default:0
    },
    orderscount:{
      type:Number,
      default:0
    },
    cashbackpoints:{
      type:Number,
      default:100
    },
    dob:{
      type:String
    }
    
  },
  { timestamps: true }
);

userschema.virtual("password").set(function (password) {
  this.key = uuid.v4();
  this.encry_password = this.securePassword(password);
});

userschema.methods = {
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

const User = new mongoose.model("User", userschema);

module.exports = User;
