const msgroute = require("express").Router();
const {
    addmessage
} = require("./controllers");

msgroute.post("/addmessage",addmessage);

module.exports = { msgroute };
