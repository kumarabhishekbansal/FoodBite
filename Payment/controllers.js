const stripe = require("stripe")(process.env.STRIPE_KEY);
const User = require("../User/model");

const datas = () => {
  console.log("datas");
};

const paymentprocess = async (req, res) => {
  console.log("enter paymentprocess");
  const { cart, id, amountpay } = req.body;
  // console.log(cart," ",id);
  const user = await User.findOne({ _id: id });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  const orderData = cart.map((item) => {
    return {
      _id: item._id,
      quantity: item.quantity,
      userId: user._id,
    };
  });
  const coupon = await stripe.coupons.create({
    amount_off: amountpay*100,
    currency: "inr",
    duration: "repeating",
    duration_in_months: 3,
  });
  // console.log("coupon ", coupon);

  const customer = await stripe.customers.create({
    email: user.email,
    metadata: {
      cart: JSON.stringify(orderData),
    },
  });
  const session = await stripe.checkout.sessions.create({
    shipping_address_collection: {
      allowed_countries: ["PK", "IN", "BD"],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 0,
            currency: "inr",
          },
          display_name: "Free shipping",
          // Delivers between 5-7 business days
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 5,
            },
            maximum: {
              unit: "business_day",
              value: 7,
            },
          },
        },
      },
    ],
    line_items: cart.map((item) => {
      // const percentage = item.discount / 100;
      // let actualPrice = item.price - item.price * percentage;
      // actualPrice = parseFloat(actualPrice);
      // actualPrice = actualPrice * 100;
      // actualPrice = actualPrice.toFixed(1);
      let actualPrice = item.price;
      actualPrice = actualPrice * 100;
      return {
        price_data: {
          currency: "inr",
          product_data: {
            name: item.name,
          },
          unit_amount_decimal: actualPrice,
        },
        quantity: item.quantity,
      };
    }),
    customer: customer.id,
    mode: "payment",
    discounts: [{
      coupon: coupon.id,
    }],
    success_url: `${process.env.CLIENT}/profile?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.CLIENT}/cart`,
  });
  res.json({ url: session.url });
};

module.exports = {
  paymentprocess,
};
