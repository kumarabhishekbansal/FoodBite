const mongoose=require("mongoose");

// const itemschema=new mongoose.Schema({
//     resid:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:'Resturants'
//     },
//     item:[
//         {
//             img:{                  // from cloudinary
//                 type:String,
//                 required:true
//             },
//             category:{
//                 type:String,
//                 required:true
//             },
//             title:{
//                 type:String,
//                 required:true
//             },
//             desc:{
//                 type:String,
//                 required:true
//             },
//             price:{
//                 type:String,
//                 required:true
//             },
//             Quantity:{                 // to check if item is available at that time or not
//                 type:Number,
//                 required:true
//             },
//             size:{
//                 type:String,
//                 trime:true
//             },
//             nv:{                      // veg or non veg
//                 type:String,
//                 required:true
//             }
//         }
//     ]
// })

const itemschema = new mongoose.Schema(
    {
      name: { type: String, required: true },
      isVeg: { type: Boolean, required: true },
      isContainsEgg: { type: Boolean, required: true },
      category: { type: String, required: true },
      photo: {
        type: String,
      },
      price: { type: Number, default: 150, required: true },
      restaurant: {
        type: mongoose.Types.ObjectId,
        ref: 'Restaurant',
      },
      reviews: {
        type: mongoose.Types.ObjectId,
        ref: 'Review',
      },
      quantity:{
        type:Number,
        default:0
      }
    },
    {
      timestamps: true,
    }
  );


const Item=new mongoose.model('Item',itemschema);

module.exports=Item;