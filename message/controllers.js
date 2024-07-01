const Message = require("./model");
const {ContactMail}=require("../mailer/mailer");
const addmessage = async (req, res) => {
  try {
    console.log("enter add message");
    const { userId, username, useremail, usersubject, usermessage } = req.body;

    if (!userId || !username || !useremail || !usersubject || !usermessage) {
      return res.status(400).json({
        message: "please filled all data",
      });
    }
    const msgcreate = await Message.create({
      userId: userId,
      username: username,
      useremail: useremail,
      usersubject: usersubject,
      usermessage: usermessage,
    });
    await msgcreate.save();

    if(msgcreate)
    {
        console.log("enter msgcreate");
        ContactMail(msgcreate,"FoodBite Contact US Message");
        return res.status(200).json({
            message: "Message created check your mail",
          });
    }
    return res.status(400).json({
        message: "Message can not be created",
      });

  } catch (error) {
    console.log("error while add message");
  }
};


module.exports={addmessage}