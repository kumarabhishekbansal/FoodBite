import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import EmptyCart from "../../../Components/components/Empty/EmptyCart";
import "./ViewMenuRes.css";
import {
  getCartTotal,
  removeItem,
  decreaseItemQuantity,
  increaseItemQuantity,
} from "../../../Reducers/Cart/CartSlice";
// import { useSendPaymentMutation } from "../../../Reducers/Payment/PaymentService";
let API_URL = "/api/pay/";

const Cart = () => {
  const { cart, totalQuantity, totalPrice } = useSelector(
    (state) => state.cart
  );

  const [cashpoint, setcashpoint] = useState(0);
  const [getdiscount, setgetdiscount] = useState(0);
  const [amountpay, setamountpay] = useState(totalPrice);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [doPayment, response] = useSendPaymentMutation();

  // console.log("payment response", response);
  const [isLoading, setisLoading] = useState(false);
  const [isSuccess, setisSuccess] = useState(false);
  let response = "";
  const pay = async () => {
    if (user) {
      setisLoading(true);
      // cart.totalPrice=amountpay
      const data = { cart: cart, id: user._id,amountpay:getdiscount};
      console.log("Data is :", data);
      response = await axios.post(API_URL + "create-checkout-session", data);
      if (response !== "") {
        setisLoading(false);
        setisSuccess(true);
        console.log("pay response ", response);
        console.log(response.data);
        window.location.href = response?.data?.url;
      } else {
        console.log("some error happens");
      }
    } else {
      navigate("/login");
    }
  };

  const cashvalue = (e) => {
    setcashpoint(e.target.value);
  };

  const cashback = (e) => {
    e.preventDefault();
    if (cashpoint !== 0) {
      // 5 points=1rs
      let discount = cashpoint / 5;
      localStorage.setItem("cashbackpoints", JSON.stringify(discount));
      setgetdiscount(discount);
      setamountpay(totalPrice-getdiscount);
    } else {
      localStorage.setItem("cashbackpoints", JSON.stringify(0));
    }
  };

  const fetchdata = () => {
    dispatch(getCartTotal());
    if (cart.length > 0) {
      localStorage.setItem("cartitems", JSON.stringify(cart));
    }
  };

  useEffect(() => {
    fetchdata();
  }, [cart]);

  // useEffect(() => {
  //   if (isSuccess) {
  //     console.log(response.data);
  //     // window.location.href = response?.data?.url;
  //   }
  // }, [isSuccess]);

  if(cart.length===0)
  {
      return <EmptyCart />
  }

  return (
    <div className="cart_div">
      <section className="h-100 gradient-custom">
        <div className="container py-5">
          <div className="row d-flex justify-content-center my-4">
            <div className="col-md-8">
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h5 className="mb-0">Cart - {cart.length} items</h5>
                </div>
                <div className="card-body">
                  {cart?.map((data) => (
                    <div className="row">
                      <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                        <div
                          className="bg-image hover-overlay hover-zoom ripple rounded"
                          data-mdb-ripple-color="light"
                        >
                          <img
                            src={data.photo}
                            className="w-100"
                            alt="Blue Jeans Jacket"
                          />
                        </div>
                      </div>

                      <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                        <p>
                          <strong>{data.name}</strong>
                        </p>

                        <button
                          type="button"
                          className=" btn-primary btn-sm me-1 mb-2"
                          data-mdb-toggle="tooltip"
                          title="Remove item"
                          onClick={() => dispatch(removeItem(data._id))}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>

                      <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                        <div
                          className="d-flex mb-4"
                          style={{ maxWidth: "300px" }}
                        >
                          <button
                            className="btn btn-primary px-3 me-2"
                            onClick={() =>
                              dispatch(decreaseItemQuantity(data._id))
                            }
                          >
                            <i className="fas fa-minus"></i>
                          </button>

                          <div className="form-outline">
                            <input
                              id="form1"
                              min="0"
                              name="quantity"
                              value={data.quantity}
                              type="number"
                              className="cart_number"
                              onChange={() => null}
                            />
                            <label className="form-label" for="form1"></label>
                          </div>

                          <button
                            className="btn btn-primary px-3 ms-2"
                            onClick={() =>
                              dispatch(increaseItemQuantity(data._id))
                            }
                          >
                            <i className="fas fa-plus"></i>
                          </button>
                        </div>

                        <p className="text-start text-md-center">
                          <strong>{data.price}</strong>
                        </p>
                      </div>
                      <hr className="my-4" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h5 className="mb-0">Summary</h5>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                      Total Quantity
                      <span>{totalQuantity}</span>
                    </li>

                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                      <div>
                        <strong>Total amount</strong>
                      </div>
                      <span>
                        <strong>{totalPrice}</strong>
                      </span>
                    </li>
                  </ul>

                  <form onSubmit={cashback}>
                    <input
                      type="number"
                      name="cashpoint"
                      id="cashpoints"
                      placeholder="enter Cashback points"
                      title={`You have ${user.cashbackpoints} points available`}
                      onChange={cashvalue}
                      value={cashpoint}
                      className="inpt"
                    />
                    <button type="submit" className="applybtn">
                      Apply
                    </button>
                    <input
                      type="number"
                      value={-getdiscount}
                      readOnly
                      className="getdisbtn"
                    />
                  <br />
                    <input type="number" readonly
                    value={amountpay}
                    className="inpt1"
                     />
                      <label className="form-label amp" for="form1">
                      Amount to be paid
                    </label>
                  </form>

                  <button
                    className="btn bg-indigo-600 text-sm font-medium py-2.5"
                    onClick={pay}
                  >
                    {isLoading ? "Loading..." : "checkout"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cart;
