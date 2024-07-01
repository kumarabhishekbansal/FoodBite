const mongoose=require('mongoose');

const paymentschema=new mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    resid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Restaurant'
    },
    payment_type:{
        type:String,
        required:true
    },
    payment_status:{
        type:String,
        default:"Done"
    },
    transaction_id:{
        type:String,
    },
},{
    timestamps:true
})

const Payment=new mongoose.model('Payment',paymentschema);

module.exports=Payment;