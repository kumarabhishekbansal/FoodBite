const mongoose=require("mongoose");
mongoose.connect(process.env.MONGO_URL,{
}).then(()=>{
    console.log('mongo connect success');
}).catch((err)=>{
    console.log("mongo connection unsuccess");
})

