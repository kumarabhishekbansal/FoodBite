const Order = require("./model");
const Payment = require("../Payment/model");
const User = require("../User/model");
// get all non completed orders with that particular resturant
// to know about which resturarnt that order belongs to  we will pass reasturant id with it

const getAdminOrders = async (req, res) => {
  try {
    const orders = await Order.find(
      {
        orderstatus: { $ne: "completed" },
      },
      null,
      { sort: { createdAt: -1 } }
    );
    if (orders) {
      return res.json({
        data: orders,
      });
    } else {
      return res.json({
        message: "NO data Found",
      });
    }
  } catch (error) {
    console.log("Error while getting admin orders");
  }
};

const updateAdminOrders = async (req, res) => {
  try {
    const { orderstatus, orderId, resId } = req.body;
    const updatastatus = await Order.updateOne(
      { _id: orderId },
      { orderstatus: orderstatus },
      (err, data) => {
        if (err) {
          console.log(
            "error while getting updating admin side orders if condition "
          );
          return res.redirect("/getAdminOrders/resId");
        }
        // Emit event
        // const eventEmitter = req.app.get('eventEmitter')
        // eventEmitter.emit('orderUpdated', { id:orderId, orderstatus:orderstatus })
        // return res.redirect('/getAdminOrders/resId')
      }
    );
  } catch (error) {
    console.log("error while getting updating admin side orders");
  }
};

const findorders = async (req, res) => {
  try {
    console.log("enter findorders");
    const { id } = req.body;
    const findorders = await Order.find({
      customerId: id,
    })
      .populate("orderDetails", "-userId")
      .populate("resId");

    if (findorders) {
      // console.log("findorders ",findorders);
      return res.status(200).json({
        message: "getting order history",
        data: findorders,
      });
    } else {
      return res.status(400).json({
        message: "gNothing to show!!",
      });
    }
  } catch (error) {
    console.log("error while getOrderHistory for user ");
  }
};

const orderrating = async (req, res) => {
  try {
    const { _id, orderRatings } = req.params;
    const updaterating = await Order.updateOne(
      {
        _id: _id,
      },
      { orderRatings: orderRatings },
      (err, data) => {
        if (data) {
          return res.status(200).json({
            message: "data update",
            data: data,
          });
        } else if (err) {
          console.log("error while getting updating order ratings ");
        }
      }
    );
  } catch (error) {
    console.log("error while orderrating");
  }
};

const orderdetail = async (req, res) => {
  try {
    const { userId, resId, cartId } = req.params;
    const { phone, address, payment_type, transaction_id, orderRatings } =
      req.body;

    if (!phone || !address || !payment_type || !transaction_id) {
      return res.status(404).json({
        message: "please filled all details",
      });
    }

    // payment creation

    const paymentcreate = await Payment.create({
      userid: userId,
      resid: resId,
      payment_type: payment_type,
      transaction_id: transaction_id,
    });
    await paymentcreate.save();

    if (!paymentcreate) {
      return res.status(400).json({
        message: "could not done payment",
      });
    }

    const ordercreate = await Order.create({
      customerId: userId,
      resId: resId,
      orderDetails: cartId,
      phone: phone,
      address: address,
      orderstatus: orderstatus,
      orderRatings: orderRatings,
      payment: paymentcreate._id,
    });
  } catch (error) {
    console.log("error while posting order details");
  }
};

const addorder = async (data) => {
  try {
    console.log("add order");
    const { userId, resId, cartId } = data;
    let userfind = await User.findById({ _id: userId });
    if (userfind) {
      var ordercreate = await Order.create({
        customerId: userId,
        resId: resId,
        orderDetails: cartId,
        phone: userfind.phone,
        address: userfind.address,
      });
      await ordercreate.save();
    } else {
      console.log("user not found");
    }

    if (ordercreate) {
      console.log("order crearted");
      let orderlen = userfind.orderscount;
      // console.log("orderlen ",orderlen);
      const updateuserorder = await User.findByIdAndUpdate(
        { _id: userId },
        {
          orderscount: userfind.orderscount + 1,
        }
      );

      userfind = await User.findById({ _id: userId });
      // console.log(userfind);
    } else console.log("order can not be created");
  } catch (error) {
    // console.log(error);
    console.log("error while add order");
  }
};

const getresorders = async (req, res) => {
  try {
    console.log("Enter getresorders");
    const { _id } = req.params;
    // console.log("id is ",_id);
    if (!_id) {
      return res.status(400).json({
        message: "resturarant id not found",
      });
    }
    const finddetails = await Order.find({ resId: _id })
      .populate("customerId")
      .populate("resId")
      .populate("orderDetails");
    if (finddetails) {
      return res.status(200).json({
        message: "get all details",
        data: finddetails,
      });
    }
    return res.status(400).json({
      message: "Invalid Restuarant id or you have no right to access this page",
    });
  } catch (error) {
    console.log("error while getting restruant orders detail");
  }
};

const updateorders = async (req, res) => {
  try {

    console.log("enter updateorders");

    const { _id } = req.params;
    const { order_id, orderstatus } = req.body;
    // console.log(_id,order_id,orderstatus);

    if(!_id || !order_id || !orderstatus)
    {
      return res.status(400).json({
        message:
          "Please filled all data",
      });
    }

    let findupdate = await Order.findByIdAndUpdate(
      { _id: order_id },
      { orderstatus: orderstatus }
    );

    if (findupdate) {
      findupdate = await Order.find({ resId: _id })
        .populate("customerId")
        .populate("resId")
        .populate("orderDetails");
      if (findupdate) {
        return res.status(200).json({
          message: "get all details",
          data: findupdate,
        });
      }
      return res.status(400).json({
        message:
          "Invalid Restuarant id or you have no right to access this page",
      });
    }
  } catch (error) {
    console.log("error while updating order status");
  }
};

module.exports = {
  getAdminOrders,
  updateAdminOrders,
  findorders,
  orderrating,
  orderdetail,
  addorder,
  getresorders,
  updateorders
};
