const paymentrouter = require("express").Router();
const {paymentprocess}=require("./controllers");
paymentrouter.post("/create-checkout-session",paymentprocess);
module.exports = { paymentrouter };
