const mongoose = require("mongoose");

// const orderschema=new mongoose.Schema({
//     resid:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:'Resturant'
//     },
//     userid:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:'User'
//     },
//     deliverypersonid:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:'DeliveryAgent'
//     },
//     cart:{
//             type:mongoose.Schema.Types.ObjectId,
//             ref:'Cart'
//         }
//     ,
//     orderdate:{
//         type:Date,
//     }
// },{
//     timestamps:true
// })

// const OrderSchema = new mongoose.Schema(
//     {
//       user: {
//         type: mongoose.Types.ObjectId,
//         ref: 'User',
//       },
//       orderDetails: [
//         {
//           Item: { type: mongoose.Types.ObjectId, ref: 'Item' },
//           quantity: { type: Number, required: true },
//           paymode: { type: String, required: true },
//           status: { type: String, default: 'Placed' },
//           paymentDetails: {
//             itemTotal: { type: Number, required: true },
//             promo: { type: Number, required: true },
//             tax: { type: Number, required: true },
//           },
//         },
//       ],
//       orderRatings: {
//         type: Number,
//         default:0,
//       },
//     },
//     {
//       timestamps: true,
//     }
//   );

const orderSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    resId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    orderDetails:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
    },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    orderstatus: { type: String, default: "Placed" },
    orderRatings: {
      type: Number,
      default: 4,
    },
    payment:{
      type:String,
      default:"Online"
  },
  },
  { timestamps: true }
);

const Order = new mongoose.model("Order", orderSchema);

module.exports = Order;
