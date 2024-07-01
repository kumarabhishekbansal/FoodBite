const mongoose=require("mongoose");

const messageSchema=new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    username:{
        type:String,
    },
    useremail:{
        type:String,
    },usersubject:{
        type:String,
    },
    usermessage:{
        type:String
    } 
})

const Message=new mongoose.model("Message",messageSchema);

module.exports=Message;