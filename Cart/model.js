const mongoose = require("mongoose");

const cartschema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  items: [
    {
      itemimg:{
        type:String
      },
      itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
      },
      itemname:{
        type:String
      },
      quantity: {
        type:Number
      },
      price:{
        type:Number
      },
      totalPrice:{
        type:Number
      }
    },
  ],
  amount:{
    type:Number,
    default:0
  },
  amountoff:{
    type:Number,
    default:0
  },
  totalAmount:{
    type:Number,
    default:0
  }
},{timestamps:true});

const Cart = new mongoose.model("Cart", cartschema);

module.exports = Cart;
